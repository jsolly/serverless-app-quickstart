import type { APIRoute } from "astro";
import { createErrorResponse } from "../../../lib/api-errors";
import { createSupabaseServerClient } from "../../../lib/supabase";
import { createUserService } from "../../../lib/users";

export const PATCH: APIRoute = async ({ request, cookies }) => {
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
		const body = await request.json();
		const { bio } = body;

		const currentUser = await users.getById(authUser.id);

		if (bio === undefined || bio === currentUser.bio) {
			return new Response(JSON.stringify({ message: "No changes to update" }), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			});
		}

		const updatedUser = await users.update(authUser.id, {
			bio: bio || null,
		});

		return new Response(JSON.stringify({ user: updatedUser }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.error("Profile update failed:", error);
		return createErrorResponse(error, {
			fallbackMessage: "Failed to update profile",
		});
	}
};
