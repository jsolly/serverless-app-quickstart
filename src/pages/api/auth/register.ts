import type { APIRoute } from "astro";
import { createSupabaseServerClient } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
	const supabase = createSupabaseServerClient(cookies);

	const formData = await request.formData();
	const email = formData.get("email")?.toString();
	const password = formData.get("password")?.toString();

	if (!email || !password) {
		return new Response("Email and password are required", { status: 400 });
	}

	const { error } = await supabase.auth.signUp({
		email,
		password,
	});

	if (error) {
		console.error("User registration failed:", error);
		return new Response("Failed to register account", { status: 500 });
	}

	return redirect(`/unconfirmed?email=${encodeURIComponent(email)}`);
};
