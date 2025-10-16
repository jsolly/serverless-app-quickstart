import type { APIRoute } from "astro";
import { createSupabaseServerClient } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, redirect }) => {
	const supabase = createSupabaseServerClient();

	try {
		const formData = await request.formData();
		const email = formData.get("email")?.toString();

		if (!email) {
			return redirect("/forgot?error=email_required");
		}

		const siteUrl = import.meta.env.SITE_URL;
		if (!siteUrl) {
			console.error("SITE_URL environment variable is not configured");
			return redirect("/forgot?error=server_error");
		}

		const redirectTo = new URL("/recover", siteUrl).toString();

		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo,
		});

		if (error) {
			console.error("Password reset request failed:", error);

			if (error.status === 429) {
				const seconds = error.message?.match(/(\d+)\s+seconds?/)?.[1];
				if (seconds) {
					return redirect(`/forgot?error=rate_limit&seconds=${seconds}`);
				}
				return redirect("/forgot?error=rate_limit");
			}

			return redirect("/forgot?error=failed");
		}

		return redirect("/forgot?success=true");
	} catch (error) {
		console.error("Password reset request failed:", error);
		return redirect("/forgot?error=failed");
	}
};
