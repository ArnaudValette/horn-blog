import { orgDate } from "org-horn-parser/build/horn/GlitterNodes"

export function dateGetString(g: orgDate): string[] {
  const [d, m, y] = [g.day, g.month, g.year]
  const temp = Date.parse(`${m}/${d}/${y}`)
  const x = new Date(temp).toString().split(" ").slice(0, 4)
  return x
}
