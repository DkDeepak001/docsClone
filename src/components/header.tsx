import { ModeToggle } from "./ui/themeToggle"
import Logo from '../../public/icon.png'
import Image from "next/image"
export const Header = () => {
  return (
    <div className="w-full h-20 flex flex-row items-center justify-between border-b-[1px] border-b-foreground/20 px-20">
      <div className="flex flex-row items-center justify-center gap-x-2">
        <Image src={Logo} alt="logo" className="h-12 w-12" />
        <h2 className="text-foreground font-black text-xl">Docs</h2>
      </div>
      <ModeToggle />
    </div>
  )
}
