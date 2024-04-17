import { useTheme } from "next-themes"
import { TailSpin } from "react-loader-spinner"

export const Loader = () => {
  const { theme } = useTheme()
  const spinerColor = theme === "Dark" ? "fff" : "#000"
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <TailSpin
        visible={true}
        height="40"
        width="40"
        color={spinerColor}
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  )
}
