import type { APIRoute } from "astro";
import { createErrorResponse } from "../../../lib/api-errors";
import { createSupabaseServerClient } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies }) => {
	const supabase = createSupabaseServerClient(cookies);

	try {
		const body = await request.json();
		const { email } = body;

		if (!email) {
			return new Response(JSON.stringify({ error: "Email is required" }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			});
		}

		const { error } = await supabase.auth.resend({
			type: "signup",
			email,
		});

		if (error) {
			throw error;
		}

		return new Response(
			JSON.stringify({ message: "Verification email sent successfully" }),
			{
				status: 200,
				headers: { "Content-Type": "application/json" },
			},
		);
	} catch (error) {
		console.error("Resend verification email failed:", error);
		return createErrorResponse(error, {
			fallbackMessage: "Failed to send verification email",
		});
	}
};
