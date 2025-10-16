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

		const siteUrl = import.meta.env.SITE_URL;
		if (!siteUrl) {
			console.error("SITE_URL environment variable is not configured");
			return new Response("Server configuration error", { status: 500 });
		}

		const redirectTo = new URL("/recover", siteUrl).toString();

		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo,
		});

		if (error) {
			console.error("Password reset request failed:", error);

			if (error.status === 429) {
				const seconds = error.message?.match(/(\d+)\s+seconds?/)?.[1];
				const waitMessage = seconds
					? `For security purposes, you must wait ${seconds} more seconds before requesting to reset your password`
					: "You've made too many password reset requests. Please try again later";

				return createErrorResponse(
					{ message: waitMessage, status: 429 },
					{ fallbackMessage: "Failed to request password reset" },
				);
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
