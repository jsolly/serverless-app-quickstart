export function createErrorResponse(
	error: unknown,
	options: {
		fallbackMessage?: string;
		fallbackStatus?: number;
	} = {},
): Response {
	const { fallbackMessage = "An error occurred", fallbackStatus = 500 } =
		options;

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

	return new Response(JSON.stringify({ error: message }), {
		status,
		headers: { "Content-Type": "application/json" },
	});
}
