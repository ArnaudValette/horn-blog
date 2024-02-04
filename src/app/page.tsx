import { clientM } from "@/utils/parser"
import Nav from "./components/Nav"
import "./page.css"

//export const dynamic = "force-dynamic"

export default async function Page() {
  const links = clientM()
  return (
    <main>
      <Nav {...{ links }} />
    </main>
  )
}
