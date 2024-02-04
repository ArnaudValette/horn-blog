import { HornNode } from "org-horn-parser/build"
import React from "react"
import { Glitters } from "./Glitters"
import { RecurseInTree } from "./TreeRecurse"
import ReadingModeToggler from "../client-components/ReadingMode"
import { Prefix } from "../client-components/client-lib/utils"

export function Table(props: any) {
  return (
    <div className="table-wrapper">
      <table>
        <tbody>
          {props.node.children.map((c: HornNode, i: number) => (
            <tr key={c.id}>
              {c.children.map((cell: HornNode, j: number) => (
                <td key={cell.id}>{cell.textContent}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Heading(props: any) {
  const Tag = `h${props.level}`
  return (
    <div className={`section lvl-${props.level}`}>
      <ReadingModeToggler l={props.level} id={props.tree.id} />
      {React.createElement(
        Tag,
        { id: `${props.tree.id}`, className: "heading-node" },
        <>
          <a id={`a-${props.tree.id}`}></a>
          <>
            {props.sent && <Prefix l={props.level - 2} i={props.i} />}
            {props.children}
          </>
        </>,
      )}
      <RecurseInTree tree={props.tree} />
    </div>
  )
}

export function ListWrapper({ node }: any) {
  return (
    <ul>
      {node.listEl &&
        node.listEl.map((el: HornNode, i: number) => (
          <List node={el} key={el.id} />
        ))}
    </ul>
  )
}

export function List({ node }: any) {
  return (
    <li>
      <Glitters glitters={node.glitterNodes} />
      {node.children &&
        node.children.map((w: HornNode, i: number) => (
          <ListWrapper node={w} key={w.id} />
        ))}
    </li>
  )
}

export function OrgCode(props: any) {
  return <div className="name"></div>
}

export function FootNote(props: any) {
  return <div className="name"></div>
}
