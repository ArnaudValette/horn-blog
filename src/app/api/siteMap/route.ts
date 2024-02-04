import { getLinkData } from "@/utils/parser"

export async function GET() {
  return new Response(JSON.stringify(getLinkData()), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}
