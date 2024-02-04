"use client"

import "../../../page.css"
import { HornNode } from "org-horn-parser/build"
import { GlitterProps } from "../components/Glitters"
import Prism from "prismjs"
import { useEffect, useState } from "react"

export function OrgFootNote(props: GlitterProps & { note: string }) {
  const note = JSON.parse(props.note)
  const id = note.noteId
  const [trigger, setTrigger] = useState<boolean>(false)
  return (
    <>
      <sup
        onMouseOver={() => setTrigger(true)}
        onMouseLeave={() => setTrigger(false)}
        className="article-footnote"
      >
        {id}
      </sup>
      {trigger ? (
        note && (
          <div className="modal">
            <p>{note.textContent}</p>
          </div>
        )
      ) : (
        <></>
      )}
    </>
  )
}

export function STemplate(props: any) {
  const node = JSON.parse(props.node)
  const Info = node.Info
  useEffect(() => {
    Prism.highlightAll()
  }, [])
  return (
    <pre>
      <span className="pre-label">{Info}</span>
      {node.children.map((c: HornNode, i: number) => (
        <code key={i} className={`language-${Info}`}>
          {c.textContent}
        </code>
      ))}
    </pre>
  )
}
