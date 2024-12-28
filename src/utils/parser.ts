import { FootNode, HornNode, Parser } from "org-horn-parser/build"
import * as fs from "fs"
import path from "path"
import { cwd } from "process"

export type LinkTree = { child: LinkTree[]; name: string }
export type LinkData = {
  href: string
  text: string
  tree: LinkData[]
}
export type Articles = { [key: string]: HornNode }

let p: Parser = new Parser()
var m: LinkData[] = []
var d: Articles = {}
var f: FootNode[] = []

export function reset() {
  m = []
  d = {}
  f = []
  p = new Parser()
}

export const getParser = () => p
export const getLinkData = () => m
export const getArticles = () => d
export const getFootnotes = () => f

const clientX = (s: string) => 
  JSON.parse(fs.readFileSync(path.join(cwd(),
`data/${s}`)).toString())
export const clientF = () => clientX("f")
export const clientD = () => clientX("d")
export const clientM = () => clientX("m")
export const createFN = (h: FootNode) => f.push(h)

const genLink = (h: HornNode) => safen(h.textContent).toLowerCase()

function safen(str: string) {
  return str
    .replace(/\s/g, "-")
    .replace(/&/g, "&amp;")
    .replace(/\?/g, "&qm;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/:/g, "-")
}

export function createRoute(h: HornNode) {
  const link = genLink(h)
  m.push({
    href: `/api/article/${link}`,
    text: h.textContent,
    tree: [getTree(h, link)],
  })
  d[link] = h
}

function getTree(h: HornNode, baseUrl: string): LinkData {
  const link = genLink(h)
  const href = baseUrl + "/" + link
  const tree: LinkData = { tree: [], text: h.textContent, href }
  h.children.forEach((c: HornNode) => {
    if (c.nType === "heading") {
      tree.tree.push(getTree(c, href))
    }
  })
  return tree
}
