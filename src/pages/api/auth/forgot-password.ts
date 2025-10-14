import type { APIRoute } from "astro";
import { createSupabaseServerClient } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies }) => {
	const supabase = createSupabaseServerClient(cookies);

	try {
		const formData = await request.formData();
		const email = formData.get("email")?.toString();

		if (!email) {
			return new Response("Email is required", { status: 400 });
		}

		const siteUrl = import.meta.env.SITE_URL ?? "http://localhost:4321";
		const redirectTo = `${siteUrl}/recover`;

		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo,
		});

		if (error) {
			console.error("Password reset request failed:", error);
			return new Response("Failed to request password reset", { status: 500 });
		}

		return new Response(null, { status: 204 });
	} catch {
		return new Response("Failed to request password reset", { status: 500 });
	}
};
