import type { SupabaseClient } from "@supabase/supabase-js";
import type { AstroCookies } from "astro";
import type { Database } from "../types/database";

export function createUserService(
	supabase: SupabaseClient,
	cookies: AstroCookies,
) {
	return {
		async getCurrentUser() {
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
		},

		async create(userData: Database["public"]["Tables"]["users"]["Insert"]) {
			const { data, error } = await supabase
				.from("users")
				.insert(userData)
				.select()
				.single();

			if (error) throw error;
			return data;
		},

		async getById(id: string) {
			const { data, error } = await supabase
				.from("users")
				.select("*")
				.eq("id", id)
				.single();

			if (error) throw error;
			return data;
		},

		async getByEmail(email: string) {
			const { data, error } = await supabase
				.from("users")
				.select("*")
				.eq("email", email)
				.single();

			if (error) throw error;
			return data;
		},

		async update(
			id: string,
			updates: Database["public"]["Tables"]["users"]["Update"],
		) {
			const { data, error } = await supabase
				.from("users")
				.update(updates)
				.eq("id", id)
				.select()
				.single();

			if (error) throw error;
			return data;
		},

		async delete(id: string) {
			const { error } = await supabase.from("users").delete().eq("id", id);

			if (error) throw error;
		},
	};
}
