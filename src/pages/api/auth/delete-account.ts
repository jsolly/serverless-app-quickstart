import type { APIRoute } from "astro";
import { createErrorResponse } from "../../../lib/api-errors";
import {
	createSupabaseAdminClient,
	createSupabaseServerClient,
} from "../../../lib/supabase";
import { createUserService } from "../../../lib/users";

export const DELETE: APIRoute = async ({ cookies, redirect }) => {
	const supabase = createSupabaseServerClient(cookies);
	const users = createUserService(supabase, cookies);
	const authUser = await users.getCurrentUser();

	if (!authUser) {
		return new Response(JSON.stringify({ error: "Unauthorized" }), {
			status: 401,
			headers: { "Content-Type": "application/json" },
		});
	}

	try {
		const supabaseAdmin = createSupabaseAdminClient();
		const { error } = await supabaseAdmin.auth.admin.deleteUser(authUser.id);

		if (error) {
			throw error;
		}

		cookies.delete("sb-access-token", { path: "/" });
		cookies.delete("sb-refresh-token", { path: "/" });

		return redirect("/");
	} catch (error) {
		console.error("Account deletion failed:", error);
		return createErrorResponse(error, {
			fallbackMessage: "Failed to delete account",
			json: true,
		});
	}
};
