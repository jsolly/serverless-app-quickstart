// With `output: 'static'` configured:
// export const prerender = false;
import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, redirect }) => {
	const formData = await request.formData();
	const email = formData.get("email")?.toString();
	const password = formData.get("password")?.toString();

	if (!email || !password) {
		return new Response("Email and password are required", { status: 400 });
	}

	const { data, error } = await supabase.auth.signUp({
		email,
		password,
	});

	if (error) {
		return new Response(error.message, { status: 500 });
	}

	// Create user profile if signup was successful
	if (data.user) {
		const { error: profileError } = await supabase.from("users").insert({
			id: data.user.id,
			email: data.user.email!,
		});

		if (profileError) {
			console.error("Failed to create user profile:", profileError);
			// Continue anyway - the auth user was created successfully
		}
	}

	return redirect("/signin");
};
