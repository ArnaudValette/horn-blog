"use client"
import { LinkData } from "@/utils/parser"
import { useState } from "react"

export function Header(props: { links: string }) {
  const l: LinkData[] = JSON.parse(props.links)
  return (
    <>
      <PhoneHeader>
        <HomeComponent links={l} />
      </PhoneHeader>
      <header className="desktop-nav desktop-ui">
        <HomeComponent links={l} />
      </header>
    </>
  )
}

export function HomeComponent({ links }: { links: LinkData[] }) {
  return (
    <nav>
      <section>
        {links.map((l: LinkData, i: number) => (
          <Resource key={i} href={l.href} title={l.text} tree={l.tree} />
        ))}
      </section>
    </nav>
  )
}

function PhoneHeader(props: any) {
  const [toggle, setToggle] = useState<boolean>(false)
  return toggle ? (
    <>
      <div className="blur phone-ui"></div>
      <header className="phone-nav phone-ui">
        <div onClick={() => setToggle(false)} className="phone-nav-leave">
          close
        </div>
        {props.children}
      </header>
    </>
  ) : (
    <div className="phone-nav-button phone-ui">
      <div onClick={() => setToggle(true)}>menu</div>
    </div>
  )
}

function Resource(props: any) {
  const href = props.href.replace(/^\/api/, "")
  return (
    <a href={href} className="resource">
      {props.title}
    </a>
  )
}
