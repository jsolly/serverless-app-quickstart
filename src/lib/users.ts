import type { Database } from "../types/database";
import { supabase } from "./supabase";

export async function createUser(
	userData: Database["public"]["Tables"]["users"]["Insert"],
) {
	const { data, error } = await supabase
		.from("users")
		.insert(userData)
		.select()
		.single();

	if (error) throw error;
	return data;
}

export async function getUserById(id: string) {
	const { data, error } = await supabase
		.from("users")
		.select("*")
		.eq("id", id)
		.single();

	if (error) throw error;
	return data;
}

export async function getUserByEmail(email: string) {
	const { data, error } = await supabase
		.from("users")
		.select("*")
		.eq("email", email)
		.single();

	if (error) throw error;
	return data;
}

export async function updateUser(
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
}

export async function deleteUser(id: string) {
	const { error } = await supabase.from("users").delete().eq("id", id);

	if (error) throw error;
}
