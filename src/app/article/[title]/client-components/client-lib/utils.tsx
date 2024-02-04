import React from "react"
import { abc, levels, romanKeys } from "./const"

function romanize(num: number): string {
  var digits: string[] = (String(num) as string).split("")
  let roman = ""
  let i = 3
  while (i--) {
    roman = (romanKeys[+(digits.pop() as string) + i * 10] || "") + roman
  }
  return Array(+digits.join("") + 1).join("M") + roman
}

function letterize(i: number): string {
  return `${abc[i % abc.length]}.`
}

const preDispatch: { [key: string]: (i: number) => string } = {
  romans: (i: number) => romanize(i + 1),
  nums: (i: number) => `${i + 1}.`,
  letters: (i: number) => letterize(i).toUpperCase(),
  smallLetters: (i: number) => letterize(i),
  smallRomans: (i: number) => romanize(i + 1).toLowerCase(),
  none: (_i: number) => `- `,
}

export function Prefix({ l, i }: { l: number; i: number }): React.JSX.Element {
  const sel: string = l >= levels.length ? "none" : levels[l]
  const str: string = `${preDispatch[sel as string](i)} `
  return <span className="prefix-indent">{str}</span>
}
