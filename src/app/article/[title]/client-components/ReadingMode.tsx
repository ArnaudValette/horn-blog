"use client"

import {
  align,
  toNext,
  toParent,
  toPrev,
  toTop,
  toggle,
} from "./client-lib/dom"

export default function ReadingModeToggler({
  l,
  id,
}: {
  l: number
  id: number
}) {
  return (
    <div
      className={
        l === 1 ? "first-reading-mode-wrapper" : "reading-mode-wrapper"
      }
    >
      {l !== 1 && (
        <>
          <Btn click={() => toParent(l, id)} txt="parent" />
          <Btn click={() => toPrev(id)} txt="prev" />
        </>
      )}
      <Btn click={() => toNext(id)} txt="next" />
      {l !== 1 && (
        <>
          <Btn click={() => align(id)} txt="align current" />
          <Btn click={() => toTop()} txt="to top" />
        </>
      )}
      <Btn click={() => toggle()} txt="read mode" />
    </div>
  )
}

function Btn({ click, txt }: { click: Function; txt: string }) {
  return (
    <div className="reading-mode-button">
      <button onClick={() => click()}>{txt}</button>
    </div>
  )
}
