import type { AstroCookies } from "astro";
import { supabase } from "./supabase";

export async function getCurrentUser(cookies: AstroCookies) {
	const accessToken = cookies.get("sb-access-token");
	const refreshToken = cookies.get("sb-refresh-token");

	if (!accessToken || !refreshToken) {
		return null;
	}

	try {
		const { data, error } = await supabase.auth.setSession({
			refresh_token: refreshToken.value,
			access_token: accessToken.value,
		});

		if (error || !data.user) {
			return null;
		}

		return data.user;
	} catch {
		return null;
	}
}
