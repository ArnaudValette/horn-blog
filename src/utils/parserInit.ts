import * as fs from "fs"
import path from "path"
import {
  createFN,
  createRoute,
  getArticles,
  getFootnotes,
  getLinkData,
  getParser,
} from "./parser"
import { FootNode, HornNode, Parser } from "org-horn-parser/build"

export function parserInit(): Parser {
  const p: Parser = getParser()
  const d = fs.readFileSync(
    path.join(process.cwd(), "/src/ressources/data.org"),
  )
  p.parseOrg(d)
  return p
}

export function parserProcess(p: Parser): { m: string; d: string; f: string } {
  p.state.roots.forEach((h: HornNode) => {
    if (h.nType !== "footNote") createRoute(h)
    else createFN(h as FootNode)
  })
  return {
    f: str(getFootnotes()),
    d: str(getArticles()),
    m: str(getLinkData()),
  }
}

export const str = (x: any): string => JSON.stringify(x)
