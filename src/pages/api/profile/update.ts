import type { APIRoute } from "astro";
import { getCurrentUser } from "../../../lib/auth";
import { getUserById, updateUser } from "../../../lib/users";

export const PATCH: APIRoute = async ({ request, cookies }) => {
	const authUser = await getCurrentUser(cookies);

	if (!authUser) {
		return new Response(JSON.stringify({ error: "Unauthorized" }), {
			status: 401,
			headers: { "Content-Type": "application/json" },
		});
	}

	try {
		const body = await request.json();
		const { bio } = body;

		const currentUser = await getUserById(authUser.id);

		if (bio === undefined || bio === currentUser.bio) {
			return new Response(JSON.stringify({ message: "No changes to update" }), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			});
		}

		const updatedUser = await updateUser(authUser.id, { bio: bio || null });

		return new Response(JSON.stringify({ user: updatedUser }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		return new Response(
			JSON.stringify({
				error:
					error instanceof Error ? error.message : "Failed to update profile",
			}),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			},
		);
	}
};
