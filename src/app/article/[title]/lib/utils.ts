import { HornNode } from "org-horn-parser/build"

export function DOMify(root: HornNode) {
  mergeList(root.children)
  mergeParagraph(root.children)
  return root
}

const condL = (p: HornNode, c: HornNode) =>
  p.nType.toLowerCase().includes("list") &&
  c.nType.toLowerCase().includes("list") &&
  p.level === c.level
const condP = (p: HornNode, c: HornNode) =>
  p.nType === "paragraph" && p.nType === c.nType

const mergeList = (nodes: HornNode[]) => mergeMeta(nodes, condL, mergeL)
const mergeParagraph = (nodes: HornNode[]) => mergeMeta(nodes, condP, mergeP)

function mergeMeta(
  nodes: HornNode[],
  condition: (prev: HornNode, curr: HornNode) => boolean,
  merger: (prev: HornNode, curr: HornNode) => void,
) {
  let prev = null
  const idToRemove = []
  for (let i = 0, j = nodes.length; i < j; i++) {
    let curr = nodes[i]
    if (!prev) {
      prev = curr
      if (curr.nType !== "sTemplate") {
        mergeMeta(curr.children, condition, merger)
      }
    } else {
      if (condition(prev, curr)) {
        merger(prev, curr)
        idToRemove.push(i)
      } else {
        prev = curr
      }
    }
    if (curr.nType !== "paragraph") {
      if (curr.nType !== "sTemplate") {
        mergeMeta(curr.children, condition, merger)
      }
    }
  }
  idToRemove.reverse().forEach((i: number) => {
    nodes.splice(i, 1)
  })
}

function mergeL(prev: any, curr: any) {
  if (!prev.listEl) {
    prev.listEl = []
    const { listEl, ...rest } = prev // circular dependency handling
    prev.listEl.push(Object.assign({}, rest)) // same
    prev.nType = "listWrap"
  }
  const { listEl, ...rest } = curr // circular dependency handling
  prev.listEl.push(Object.assign({}, rest)) // same
}

function mergeP(prev: HornNode, curr: HornNode) {
  prev.children = [...prev.children, ...curr.children]
  prev.id = prev.id
  prev.level = prev.level
  //@ts-ignore
  prev.glitterNodes = [
    ...prev.glitterNodes,
    { text: " ", type: 0 },
    ...curr.glitterNodes,
  ]
  prev.tags = [...prev.tags, ...curr.tags]
  prev.nType = prev.nType
  prev.textContent = prev.textContent + " " + curr.textContent
}

const types = {
  32: "bold",
  16: "italic",
  8: "underline",
  4: "strike",
  2: "code",
  1: "verbatim",
}

export function getGlitterType(t: number | string): string {
  if (typeof t !== "number") {
    return t
  }
  if (t === 0) {
    return ""
  }
  let str = []
  for (let i = 1; i < 33; i <<= 1) {
    const cond = (t & i) === i
    if (cond) {
      str.push(types[i as keyof typeof types])
    }
  }
  return str.join(" ")
}
