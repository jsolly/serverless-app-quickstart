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
			? typeof error.status === "number"
				? error.status
				: fallbackStatus
			: fallbackStatus;

	const message =
		error && typeof error === "object" && "message" in error
			? typeof error.message === "string"
				? error.message
				: fallbackMessage
			: fallbackMessage;

	if (json) {
		return new Response(JSON.stringify({ error: message }), {
			status,
			headers: { "Content-Type": "application/json" },
		});
	}

	return new Response(message, { status });
}
