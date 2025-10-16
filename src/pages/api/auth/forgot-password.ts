import type { APIRoute } from "astro";
import { createErrorResponse } from "../../../lib/api-errors";
import { createSupabaseServerClient } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies }) => {
	const supabase = createSupabaseServerClient(cookies);

	try {
		const formData = await request.formData();
		const email = formData.get("email")?.toString();

		if (!email) {
			return new Response("Email is required", { status: 400 });
		}

		const redirectTo = `${import.meta.env.SITE_URL}/recover`;

		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo,
		});

		if (error) {
			console.error("Password reset request failed:", error);

			if (error.message && typeof error.message === "string") {
				const match = error.message.match(
					/you can only request this after (\d+) seconds?/i,
				);
				if (match) {
					const seconds = match[1];
					return new Response(
						JSON.stringify({
							error: `For security purposes, you must wait ${seconds} more seconds before requesting to reset your password`,
						}),
						{
							status: error.status || 429,
							headers: { "Content-Type": "application/json" },
						},
					);
				}
			}

			return createErrorResponse(error, {
				fallbackMessage: "Failed to request password reset",
			});
		}

		return new Response(null, { status: 204 });
	} catch (error) {
		console.error("Password reset request failed:", error);
		return createErrorResponse(error, {
			fallbackMessage: "Failed to request password reset",
		});
	}
};
