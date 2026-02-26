export default function Bottombar() {
  return (
    <div className="h-10 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between px-4 shrink-0">
      {/* Legend */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-amber-400/80 shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
          <span className="text-xs text-zinc-400">Selected</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-sky-500/60 shadow-[0_0_6px_rgba(56,189,248,0.6)]" />
          <span className="text-xs text-zinc-400">Craftable</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-500/60 shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
          <span className="text-xs text-zinc-400">Base material</span>
        </div>
      </div>

      {/* Credit */}
      <p className="text-xs text-zinc-500">
        Developed by{" "}
        <a
          href="https://www.instagram.com/fielenad/" // change this to your link
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-300 font-semibold underline underline-offset-2 hover:text-amber-400 transition-colors"
        >
          fielzxc
        </a>
      </p>
    </div>
  )
}