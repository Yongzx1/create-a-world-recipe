"use client"

import { useState } from "react"
import { AlignStartVertical, AlignEndVertical, Info, X, MessageCircle, Menu } from "lucide-react"

type TopbarProps = {
  direction: "result-top" | "result-bottom"
  onDirectionChange: (dir: "result-top" | "result-bottom") => void
  onMenuToggle: () => void
}

export default function Topbar({ direction, onDirectionChange, onMenuToggle }: TopbarProps) {
  const [showCredits, setShowCredits] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText("fielzxc")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <div className="h-12 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between px-3 md:px-4 shrink-0">
        {/* Left: hamburger + title */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onMenuToggle}
            className="md:hidden p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <Menu size={18} />
          </button>
          <span className="text-white font-bold text-base md:text-lg tracking-wide">
            ⛏ <span className="hidden sm:inline">Craft-a-World Recipe</span>
            <span className="sm:hidden">CaW</span>
          </span>
        </div>

        {/* Right: buttons */}
        <div className="flex items-center gap-1.5 md:gap-2">
          <button
            type="button"
            onClick={() => onDirectionChange(direction === "result-top" ? "result-bottom" : "result-top")}
            className="flex items-center gap-1.5 px-2 md:px-3 py-1.5 rounded-md text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
            title={direction === "result-top" ? "Result on top" : "Result on bottom"}
          >
            {direction === "result-top" ? <AlignStartVertical size={14} /> : <AlignEndVertical size={14} />}
            <span className="hidden sm:inline">
              {direction === "result-top" ? "Result on top" : "Result on bottom"}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setShowCredits(true)}
            className="flex items-center gap-1.5 px-2 md:px-3 py-1.5 rounded-md text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
          >
            <Info size={14} />
            <span className="hidden sm:inline">Credits</span>
          </button>
        </div>
      </div>

      {/* Credits modal */}
      {showCredits && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setShowCredits(false)}
        >
          <div
            className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-sm shadow-2xl text-white overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
              <div>
                <h2 className="text-base font-bold">⛏ Craft-a-World</h2>
                <p className="text-zinc-400 text-xs mt-0.5">Recipe reference tool</p>
              </div>
              <button type="button" onClick={() => setShowCredits(false)} className="text-zinc-500 hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>
            <div className="px-5 py-4 space-y-4">
              <p className="text-sm text-zinc-300">Built with Next.js, React Flow & Tailwind CSS.</p>
              <div className="border-t border-zinc-800 pt-4">
                <p className="text-xs font-semibold tracking-widest text-zinc-400 uppercase flex items-center gap-1.5 mb-3">
                  <MessageCircle size={12} /> Bug Reports & Contact
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm text-white">Discord</p>
                    <p className="text-zinc-400 text-xs mt-0.5">Found a bug or have suggestions? DM me.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopy}
                    title="Click to copy username"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/40 border border-indigo-500/40 text-indigo-300 text-xs font-medium transition-colors shrink-0 ml-4"
                  >
                    <MessageCircle size={12} />
                    {copied ? "Copied!" : "fielzxc"}
                  </button>
                </div>
              </div>
              <div className="border-t border-zinc-800 pt-3">
                <p className="text-zinc-500 text-xs">Developed by Fiel</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}