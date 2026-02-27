export default function Bottombar() {
  return (
    <div className="h-10 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between px-3 md:px-4 shrink-0">
      {/* Legend */}
      <div className="flex items-center gap-3 md:gap-5">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-amber-400/80 shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
          <span className="text-xs text-zinc-400">Selected</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-sky-500/60 shadow-[0_0_6px_rgba(56,189,248,0.6)]" />
          <span className="text-xs text-zinc-400">Craftable</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-emerald-500/60 shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
          <span className="text-xs text-zinc-400">
            <span className="hidden sm:inline">Base material</span>
            <span className="sm:hidden">Base</span>
          </span>
        </div>
      </div>

      {/* Guide hints */}
      <div className="hidden md:flex items-center gap-2 text-xs text-zinc-600 select-none">
        <span>HOVER TO SEE RECIPE</span>
        <span className="text-zinc-700">·</span>
        <span>SCROLL TO ZOOM</span>
        <span className="text-zinc-700">·</span>
        <span>DRAG TO PAN</span>
      </div>

      {/* Credit */}
      <p className="text-xs text-zinc-500 shrink-0">
        <span className="hidden sm:inline">Developed by </span>
        <span className="text-zinc-300 font-semibold">fielzxc</span>
      </p>
    </div>
  )
}