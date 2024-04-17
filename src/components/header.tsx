import { ModeToggle } from "./ui/themeToggle"
import Logo from '../../public/icon.png'
import Image from "next/image"
import { useTheme } from "next-themes"
import { Search } from "lucide-react"
type HeaderProps = {
  q: string
  setQ: (q: HeaderProps['q']) => void
}


export const Header = ({ q, setQ }: HeaderProps) => {
  const { systemTheme } = useTheme()
  return (
    <div className="w-full h-20 flex flex-row items-center justify-between border-b-[1px] border-b-foreground/20 px-20">
      <div className="flex flex-row items-center justify-center gap-x-2">
        <Image src={Logo} alt="logo" className="h-12 w-12" />
        <h2 className="text-foreground font-black text-xl">Docs</h2>
      </div>
      <div className={`w-2/4 p-2 rounded-lg flex flex-row items-center border border-foreground/75 ${systemTheme === "dark" ? "bg-zinc-800" : "bg-zinc-100"}`} >
        <Search height={20} />
        <input className={'w-full p-2 rounded-lg bg-transparent  !outline-none'} placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <ModeToggle />
    </div>
  )
}
