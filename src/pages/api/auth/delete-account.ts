import type { APIRoute } from "astro";
import { getCurrentUser } from "../../../lib/auth";
import { supabaseAdmin } from "../../../lib/supabase";

export const DELETE: APIRoute = async ({ cookies, redirect }) => {
	const authUser = await getCurrentUser(cookies);

	if (!authUser) {
		return new Response(JSON.stringify({ error: "Unauthorized" }), {
			status: 401,
			headers: { "Content-Type": "application/json" },
		});
	}

	if (!supabaseAdmin) {
		return new Response(
			JSON.stringify({
				error:
					"Service role key not configured. Add SUPABASE_SERVICE_ROLE_KEY to .env.local",
			}),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			},
		);
	}

	try {
		const { error } = await supabaseAdmin.auth.admin.deleteUser(authUser.id);

		if (error) {
			throw error;
		}

		cookies.delete("sb-access-token", { path: "/" });
		cookies.delete("sb-refresh-token", { path: "/" });

		return redirect("/");
	} catch (error) {
		return new Response(
			JSON.stringify({
				error:
					error instanceof Error ? error.message : "Failed to delete account",
			}),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			},
		);
	}
};
