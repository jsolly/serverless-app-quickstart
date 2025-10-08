export interface User {
	id: string;
	email: string;
	full_name: string | null;
	avatar_url: string | null;
	created_at: string;
	updated_at: string;
}

export interface Database {
	public: {
		Tables: {
			users: {
				Row: User;
				Insert: Omit<User, "id" | "created_at" | "updated_at">;
				Update: Partial<Omit<User, "id" | "created_at" | "updated_at">>;
			};
		};
	};
}
