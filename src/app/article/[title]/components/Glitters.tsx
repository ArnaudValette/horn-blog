import "../../../page.css"
import {
  GlitterNode,
  orgCookiePercent,
  orgCookieRatio,
  orgDate,
  orgImage,
  orgLink,
} from "org-horn-parser/build/horn/GlitterNodes"
import { FootNode } from "org-horn-parser/build/horn/HornNode"
import { dateGetString } from "@/utils/date"
import { OrgFootNote } from "../client-components/GlitterNodes"
import { getGlitterType } from "../lib/utils"
import { clientF } from "@/utils/parser"
import Image from "next/image"
import React from "react"
import { str } from "@/utils/parserInit"

type GsP = { glitters: GlitterNode[] }
export type GlittersProps = GsP
export type GlitterProps = { glitter: GlitterNode }

export const Glitters = ({ glitters }: GsP) =>
  glitters && glitters.map((g, i) => <Glitter key={i} glitter={g} />)

async function Glitter({ glitter }: GlitterProps) {
  const type = getGlitterType(glitter.type)
  const fn: FootNode[] = await clientF()
  var n: any
  const set = (note: any) => (n = str(note))
  if (type === "footnote") {
    set(
      fn.find((x: FootNode) => x.noteId === parseInt((glitter as any).noteId)),
    )
  }

  return type === "cookiePercent" ? (
    <OrgCookiePercent glitter={glitter} />
  ) : type === "cookieRatio" ? (
    <OrgCookieRatio glitter={glitter} />
  ) : type === "date" ? (
    <OrgDate glitter={glitter} />
  ) : type === "checkboxEmpty" ? (
    <OrgCheckBox glitter={glitter} />
  ) : type === "checkboxCheck" ? (
    <OrgCheckBox glitter={glitter} active />
  ) : type === "image" ? (
    <OrgImage glitter={glitter} />
  ) : type === "link" ? (
    <OrgLink glitter={glitter} />
  ) : type === "footnote" ? (
    <OrgFootNote
      note={n}
      glitter={{
        ...glitter,
      }}
    />
  ) : (
    <span className={type}>{glitter.text}</span>
  )
}
export function OrgCookiePercent(props: GlitterProps) {
  const g = props.glitter as orgCookiePercent
  const p = g.percentage
  const done = p === 100
  return (
    <span className="statistic-cookie">
      <span className={done ? "cookie done" : "cookie partial"}>{p}</span>
      <span>%</span>
    </span>
  )
}
export function OrgCookieRatio(props: GlitterProps) {
  const g = props.glitter as orgCookieRatio
  const [curr, total] = [g.current, g.total]
  const done = curr === total
  return (
    <span className="statistic-cookie">
      <span className={done ? "cookie done" : "cookie partial"}>{curr}</span>
      <span>/</span>
      <span>{total}</span>
    </span>
  )
}
export function OrgDate(props: GlitterProps) {
  const g = props.glitter as orgDate
  const s = dateGetString(g).join(" ")
  return <span className="org-date">{s}</span>
}
export function OrgCheckBox(props: GlitterProps & { active?: boolean }) {
  return <input type="checkbox" checked={props.active} disabled />
}

export function OrgImage(props: GlitterProps) {
  const s = (props.glitter as orgImage).src
  return (
    <Image
      className="article-image"
      src={s}
      alt={props.glitter.text}
      width="0"
      height="0"
      sizes="100vw"
      style={{ width: "100%", height: "auto" }}
    />
  )
}
export function OrgLink(props: GlitterProps) {
  const g = props.glitter as orgLink
  const [h, t] = [g.href, g.text]
  return (
    <a target="_blank" href={h}>
      {t}
    </a>
  )
}
