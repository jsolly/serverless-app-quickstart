import type { APIRoute } from "astro";
import {
	createSupabaseAdminClient,
	createSupabaseServerClient,
} from "../../../lib/supabase";
import { createUserService } from "../../../lib/users";

export const POST: APIRoute = async ({ cookies, redirect }) => {
	const supabase = createSupabaseServerClient();
	const users = createUserService(supabase, cookies);
	const authUser = await users.getCurrentUser();

	if (!authUser) {
		return redirect("/");
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
		return redirect("/profile?error=delete_failed");
	}
};
