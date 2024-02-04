import Link from "next/link"
import "./page.css"

export default function NotFound() {
  return (
    <main>
      <div className="section">
        <p>Ressource not found</p>
        <Link href="/">Back to menu</Link>{" "}
      </div>
    </main>
  )
}
