export type ErrorData = {
  error: number
}
export function condemn(error: ErrorData) {
  return new Response(JSON.stringify(error), {
    status: 404,
    headers: { "Content-Type": "application/json" },
  })
}
