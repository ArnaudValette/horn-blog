"use client"

import { HornNode } from "org-horn-parser/build"
import { useEffect, useState } from "react"
import { Prefix } from "./client-lib/utils"

export function RenderTreeEP({ tree, path }: { tree: string; path: string }) {
  const tr: HornNode[] = JSON.parse(tree)
  const [head, setHead] = useState<number>(0)
  useTreeHighlight({ setHead })
  //className={head.value === h.id ? 'highlight':'' }
  return (
    <>
      {tr.map(
        (h: HornNode, i) =>
          h.nType === "heading" && (
            <div key={i}>
              <div className="indent">
                <a
                  className={head === h.id ? "highlight" : ""}
                  href={`#a-${h.id}`}
                >
                  {h.textContent}
                </a>
                <RenderTree
                  level={0}
                  head={head}
                  tree={h.children}
                  path={`${path + "/" + h.id}`}
                />
              </div>
            </div>
          ),
      )}
    </>
  )
}

function RenderTree({
  tree,
  path,
  head,
  level,
}: {
  tree: HornNode[]
  path: string
  head: number
  level: number
}) {
  let x = 0
  return (
    <>
      {tree.map(
        (h: HornNode, i) =>
          h.nType === "heading" && (
            <div key={i}>
              <div className="indent">
                <a
                  href={`#a-${h.id}`}
                  className={includes(h, head) ? "highlight" : ""}
                >
                  <Prefix l={level} i={x++} />
                  {h.textContent}
                </a>
                {includes(h, head) && (
                  <RenderTree
                    level={level + 1}
                    head={head}
                    tree={h.children}
                    path={`${path + "/" + h.id}`}
                  />
                )}
              </div>
            </div>
          ),
      )}
    </>
  )
}

function arrInclude(hn: HornNode[], h: number): boolean {
  for (let i = 0; i < hn.length; i++) {
    if (hn[i].id === h) return true
    const res = arrInclude(hn[i].children, h)
    if (res) return true
  }
  return false
}
function includes(hn: HornNode, h: number): boolean {
  return hn.id === h || arrInclude(hn.children, h)
}

type useTreeProps = { setHead: (arg0: number) => void }
export function useTreeHighlight(props: useTreeProps) {
  function throttle(callbackFn: any, limit: number) {
    let wait = false
    return function () {
      if (!wait) {
        callbackFn.call()
        wait = true
        setTimeout(function () {
          wait = false
        }, limit)
      }
    }
  }

  useEffect(() => {
    function getAllHeadings() {
      let hs = document.querySelectorAll("h1, h2, h3, h4, h5, h6, h7")
      hs.forEach(function (heading) {
        var rect = heading.getBoundingClientRect()
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          props.setHead(parseInt(heading.id))
        }
      })
    }
    window.addEventListener("scroll", throttle(getAllHeadings, 50))
    return () =>
      window.removeEventListener("scroll", throttle(getAllHeadings, 50))
  })
}
