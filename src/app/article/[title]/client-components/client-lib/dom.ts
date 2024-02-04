/* Tersestyle */

type elArr = NodeListOf<Element>
type n = number
type e = Element
type s = string
type f = Function
type d = Document

export const toParent = (l: n, i: n) => l > 0 && goTo(p(l, i)[0]) // if level > 0 scroll to [parent heading nodes array][0]
export const align = (i: n) => goTo(get(i))
export const toTop = () => window.scroll({ top: 0, ...ss })
export const toNext = (id: n) => every(sec(), id, goNext) // from every section, if currId found, scroll to the next section
export const toPrev = (id: n) => every(sec(), id, goPrev) // from every section, if currId found, scroll to the prev section
export function toggle() {
  let nav = (byClass("desktop-ui", document) || [null])[0]
  let st = (byClass("side-tree", document) || [null])[0]
  checkToggle(st)
  checkToggle(nav)
}

/*toggle*/
const checkToggle = (e: e | null) => e && toggler(e)
const toggler = (e: e) => (isH(e) ? show(e) : hide(e))
const isH = (e: e | null) => e && e.classList.contains("hidden")
const hide = (e: e) => e.classList.add("hidden")
const show = (e: e) => e.classList.remove("hidden")

/*goToParent*/
const hn = "heading-node"
const secname = (l: n) => `.lvl-${l - 1}`
const parentSec = (l: n, e: e | null) => e && e.closest(secname(l)) // find closest section of inferior level
const p = (l: n, id: n) => byClass(hn, parentSec(l, get(id))) || [null] // get heading nodes from parent section

/*iteration*/
const every = (a: elArr, id: n, m: f) => a.forEach((s, i, a) => m(s, i, a, id))

/*next/prev*/
const goNext = (s: e, i: n, a: elArr, id: n) =>
  IDequ(s, id) && goTo(a[wInc(a, i)])
const goPrev = (s: e, i: n, a: elArr, id: n) =>
  IDequ(s, id) && goTo(a[wDec(a, i)])
const wInc = (a: elArr, i: n): n => (i + 1) % a.length
const wDec = (a: elArr, i: n): n => (i === 0 ? a.length - 1 : i - 1)

const IDequ = (s: e, i: n): boolean => s.id === i.toString()

const sec = (): elArr => safeDo(art(), all, ".heading-node") // Article.querySelectorAll(".heading-node")
const safeDo = (e: e | null, c: Function, ...r: any): any => e && c(e, ...r) //element && func(element, ...args)
const art = (): e | null => get("Article") // getArticle

/*getNodes*/
const get = (i: n | s): e | null => document.getElementById(i.toString()) // get by id
const all = (e: e, s: s): elArr => e.querySelectorAll(s) // select all [selector]
const byClass = (s: s, e: e | d | null) => e && e.getElementsByClassName(s) // byClassName

/*node coordinates*/
const top = (e: e): number => e.getBoundingClientRect().top // clientRect.top
const y = (e: e): number => top(e) + window.scrollY // clientRect.top + scrollY

/* scroll to */
const scroll = (el: e) => window.scroll({ top: y(el) - 100, ...ss }) // scroll to element height (abstr)
const goTo = (e: e | null) => e && scroll(e) // element && scroll(element)

const ss: { behavior: "smooth" } = { behavior: "smooth" } // utils
