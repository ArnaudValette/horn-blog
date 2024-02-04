import { LinkData } from "@/utils/parser"
export const dynamic = "force-dynamic"

type NavProps = { links: LinkData[] }

export default async function Nav({ links }: NavProps) {
  return (
    <nav>
      <section>
        {links.map((l: LinkData, i: number) => (
          <Link key={i} href={l.href} title={l.text} tree={l.tree} />
        ))}
      </section>
    </nav>
  )
}

function Link(props: any) {
  const href = props.href.replace(/^\/api/, "")
  return (
    <a href={href} className="resource">
      {props.title}
    </a>
  )
}
