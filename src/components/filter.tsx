import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";

export const Filter = () => {
  return (<DropdownMenu>
    <DropdownMenuTrigger className="border border-foreground/20 px-4 py-2 rounded-sm font-semibold">sort by</DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem>last modified</DropdownMenuItem>
      <DropdownMenuItem> A - Z</DropdownMenuItem>
      <DropdownMenuItem> Z - A</DropdownMenuItem>
      <DropdownMenuItem>Newset</DropdownMenuItem>
      <DropdownMenuItem>Oldest</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}
