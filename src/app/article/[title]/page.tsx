"use server"
import "../../page.css"
import "./prism.css"
import { clientD, clientM } from "@/utils/parser"
import { Glitters } from "./components/Glitters"
import { HornNode } from "org-horn-parser/build"
import { RenderTreeEP } from "./client-components/TreeHandler"
import { Header } from "./client-components/Header"
import { DOMify } from "./lib/utils"
import React from "react"
import { Heading } from "./components/Nodes"
import NotFound from "@/app/not-found"
import { str } from "@/utils/parserInit"

/*______*/

type ArticleProps = { params: { title: string } }
type Error = { error: number }

async function getArticle(t: string): Promise<[HornNode | Error, string]> {
  const article = await clientD()
  if (!article || !article[t]) {
    return [{ error: 1 }, "no links"]
  }
  return [DOMify(article[t]), str(await clientM())]
}

export default async function Page({ params }: ArticleProps) {
  const [tree, l] = await getArticle(params.title)
  if ((tree as Error).error) return <NotFound />
  else
    return (
      <>
        {/* Nav Bar */}
        <Header links={l} />
        {/* Main Article Content */}
        <main>
          <Article tree={tree as HornNode} />
        </main>
      </>
    )
}

function Article({ tree }: { tree: HornNode }) {
  return (
    tree && (
      <>
        {/* Article content */}
        <div className="Article" id="Article">
          <Heading level={tree.level} tree={tree}>
            <Glitters glitters={tree.glitterNodes} />
          </Heading>
        </div>
        {/* Article Interactive Table of Contents */}
        <div className="side-tree">
          <nav>
            <section>
              <RenderTreeEP tree={JSON.stringify([tree])} path="/" />
            </section>
          </nav>
        </div>
      </>
    )
  )
}
