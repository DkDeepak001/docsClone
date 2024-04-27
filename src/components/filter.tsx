import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { FilterType } from "~/pages";

type FilterProps = {
  filters: FilterType[]
  setFilters: (filter: FilterProps['filters'][number]) => void
}

export const Filter = ({ filters, setFilters }: FilterProps) => {
  return (<DropdownMenu>
    <DropdownMenuTrigger className="border border-foreground/20 px-4 py-2 rounded-sm font-semibold">sort by</DropdownMenuTrigger>
    <DropdownMenuContent>
      {filters.map(f => <DropdownMenuItem key={f} onClick={() => setFilters(f)}>{f}</DropdownMenuItem>)}
    </DropdownMenuContent>
  </DropdownMenu>
  )
}
