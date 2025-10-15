export function createErrorResponse(
	error: unknown,
	options: {
		fallbackMessage?: string;
		fallbackStatus?: number;
		json?: boolean;
	} = {},
): Response {
	const {
		fallbackMessage = "An error occurred",
		fallbackStatus = 500,
		json = false,
	} = options;

	const status =
		error && typeof error === "object" && "status" in error
			? (error.status as number)
			: fallbackStatus;

	const message =
		error && typeof error === "object" && "message" in error
			? (error.message as string)
			: fallbackMessage;

	if (json) {
		return new Response(JSON.stringify({ error: message }), {
			status,
			headers: { "Content-Type": "application/json" },
		});
	}

	return new Response(message, { status });
}
