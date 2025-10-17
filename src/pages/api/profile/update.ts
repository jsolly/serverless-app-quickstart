import type { APIRoute } from "astro";
import { createSupabaseServerClient } from "../../../lib/supabase";
import { createUserService } from "../../../lib/users";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
	const supabase = createSupabaseServerClient();
	const users = createUserService(supabase, cookies);
	const authUser = await users.getCurrentUser();

	if (!authUser) {
		return redirect("/");
	}

	try {
		const formData = await request.formData();
		const bio = formData.get("bio")?.toString();

		const currentUser = await users.getById(authUser.id);

		if (bio === undefined || bio === currentUser.bio) {
			return redirect("/profile?info=no_changes");
		}

		await users.update(authUser.id, {
			bio: bio || null,
		});

		return redirect("/profile?success=true");
	} catch (error) {
		console.error("Profile update failed:", error);
		return redirect("/profile?error=failed");
	}
};
