import { reset } from "@/utils/parser"
import { parserInit, parserProcess, str } from "@/utils/parserInit"
import { condemn } from "@/utils/server"
import { NextRequest } from "next/server"
import { revalidatePath } from "next/cache"
import * as fs from "fs"
import path from "path"
import { cwd } from "process"

export async function POST(req: NextRequest) {
  const { p } = (await req.json()) || null
  if (p) {
    
    const pw: string = process.env.PASSWORD as string
    if (p === pw) {
      reset()
      parse()
      revalidatePath("/", "page")
      return ok()
    }
  }
  return condemn({ error: 1 })
}

const parse = () => send(parserProcess(parserInit()))

async function send({ m, d, f }: { m: string; d: string; f: string }) {
  add("m", m)
  add("d", d)
  add("f", f)
}

const add = (letter: string, data: string) =>
  fs.writeFileSync(path.join(cwd(), `data/${letter}`), data)

const ok = async () => new Response(str({ msg: "it works" }), { ...json200 })

const json200 = { status: 200, headers: { "Content-Type": "application/json" } }
