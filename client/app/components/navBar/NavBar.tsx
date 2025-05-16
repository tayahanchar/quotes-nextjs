import Link from "next/link"

export const NavBar = () => {
  return (
    <header className="container flex justify-between">
      <h1><Link href={"/"}>Quotes App</Link></h1>
      <nav>
        <ul className="flex gap-10">
          <li><Link href={"/random"}>Random quotes</Link></li>
          <li><Link href={"/search"}>Search quotes</Link></li>
        </ul>
      </nav>
    </header>

  )
}