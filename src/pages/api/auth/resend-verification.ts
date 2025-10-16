import type { APIRoute } from "astro";
import { createSupabaseServerClient } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, redirect }) => {
	const supabase = createSupabaseServerClient();

	const formData = await request.formData();
	const email = formData.get("email")?.toString();

	if (!email) {
		return redirect("/unconfirmed?error=email_required");
	}

	try {
		const { error } = await supabase.auth.resend({
			type: "signup",
			email,
		});

		if (error) {
			throw error;
		}

		return redirect(
			`/unconfirmed?email=${encodeURIComponent(email)}&success=true`,
		);
	} catch (error) {
		console.error("Resend verification email failed:", error);
		return redirect(
			`/unconfirmed?email=${encodeURIComponent(email)}&error=failed`,
		);
	}
};
