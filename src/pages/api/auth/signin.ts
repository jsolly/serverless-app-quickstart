import type { APIRoute } from "astro";
import { createSupabaseServerClient } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
	const supabase = createSupabaseServerClient();

	const formData = await request.formData();
	const email = formData.get("email")?.toString();
	const password = formData.get("password")?.toString();

	if (!email || !password) {
		return redirect("/?error=missing_fields");
	}

	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		if (
			error.message.includes("Email not confirmed") ||
			error.message.includes("email_not_confirmed")
		) {
			return redirect(`/unconfirmed?email=${encodeURIComponent(email)}`);
		}

		// Redirect back to the home page with a generic invalid credentials error
		return redirect(
			`/?error=invalid_credentials${email ? `&email=${encodeURIComponent(email)}` : ""}`,
		);
	}

	const { access_token, refresh_token } = data.session;
	cookies.set("sb-access-token", access_token, {
		path: "/",
	});
	cookies.set("sb-refresh-token", refresh_token, {
		path: "/",
	});
	return redirect("/dashboard");
};
