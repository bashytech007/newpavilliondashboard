import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      // Dark mode: slightly lighter than card background (slate-800/50)
      className={cn("animate-pulse rounded-md bg-slate-200/20 dark:bg-slate-700/50", className)}
      {...props}
    />
  )
}

export { Skeleton }
