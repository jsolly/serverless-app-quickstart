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

		// Ensure no double slashes in redirect URL
		const baseUrl =
			import.meta.env.SITE_URL?.replace(/\/$/, "") || "http://localhost:4321";
		const redirectTo = `${baseUrl}/recover`;

		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo,
		});

		if (error) {
			console.error("Password reset request failed:", error);
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
