import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error("Missing Supabase environment variables");
}

export function createSupabaseServerClient() {
	return createClient(supabaseUrl, supabaseAnonKey, {
		auth: {
			autoRefreshToken: false,
			persistSession: false,
		},
		global: {
			headers: {
				"Cache-Control": "no-cache, no-store, must-revalidate",
			},
		},
	});
}

export function createSupabaseAdminClient() {
	if (!supabaseServiceRoleKey) {
		throw new Error(
			"Service role key not configured. Add SUPABASE_SERVICE_ROLE_KEY to environment variables",
		);
	}
	return createClient(supabaseUrl, supabaseServiceRoleKey, {
		auth: {
			autoRefreshToken: false,
			persistSession: false,
		},
	});
}
