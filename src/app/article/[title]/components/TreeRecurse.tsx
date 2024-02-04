import { HornNode } from "org-horn-parser/build"
import { FootNote, Heading, ListWrapper, OrgCode, Table } from "./Nodes"
import { Glitters } from "./Glitters"
import { Fragment } from "react"
import { STemplate } from "../client-components/GlitterNodes"

export function RecurseInTree({ tree }: { tree: HornNode }) {
  let x = 0
  return (
    <>
      {tree.children &&
        tree.children.map((c, i: number) =>
          c.nType === "listWrap" ? (
            <ListWrapper node={c} key={c.id} />
          ) : c.nType === "heading" ? (
            <>
              <Heading level={c.level} tree={c} key={c.id} i={x++} sent={true}>
                <Glitters glitters={c.glitterNodes} />
              </Heading>
            </>
          ) : c.nType === "tableSep" ? (
            <Fragment key={c.id}></Fragment>
          ) : c.nType === "HR" ? (
            <hr key={c.id} />
          ) : c.nType === "orgCode" ? (
            <OrgCode node={c} key={c.id} />
          ) : c.nType === "footNote" ? (
            <FootNote node={c} key={c.id} />
          ) : c.nType === "paragraph" ? (
            <p key={c.id}>
              <Glitters glitters={c.glitterNodes} />
            </p>
          ) : c.nType.includes("table") ? (
            <Table node={c} key={c.id} />
          ) : c.nType === "nSrc" ? (
            <div className="pre-name" key={c.id}>
              {c.textContent}
            </div>
          ) : c.nType === "sTemplate" ? (
            <STemplate node={JSON.stringify(c)} key={c.id} />
          ) : c.nType === "empty" ? (
            <Fragment key={c.id}></Fragment>
          ) : (
            <Fragment key={c.id}>
              <Glitters glitters={c.glitterNodes} />
              <RecurseInTree tree={c} />
            </Fragment>
          ),
        )}
    </>
  )
}
