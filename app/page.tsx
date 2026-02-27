"use client"

import { useState } from "react"
import Sidebar from "@/components/ui/sidebar"
import RecipeTree from "@/components/ui/RecipeTree"
import Topbar from "@/components/ui/Topbar"
import Bottombar from "@/components/ui/Bottombar"
import { items } from "@/data/items"

export default function Home() {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
  const [direction, setDirection] = useState<"result-top" | "result-bottom">("result-top")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <main className="flex h-screen overflow-hidden bg-zinc-900">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={`
        fixed inset-y-0 left-0 z-40 transition-transform duration-300
        md:static md:translate-x-0 md:z-auto
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <Sidebar
          selectedItemId={selectedItemId}
          onSelectItem={(id) => {
            setSelectedItemId(id)
            setSidebarOpen(false)
          }}
        />
      </div>

      <div className="flex flex-col flex-1 min-w-0 h-screen">
        <Topbar
          direction={direction}
          onDirectionChange={setDirection}
          onMenuToggle={() => setSidebarOpen((o) => !o)}
        />
        <div className="flex-1 min-h-0">
          {selectedItemId ? (
            <RecipeTree selectedItemId={selectedItemId} direction={direction} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-3 select-none">
              <span className="text-5xl">⛏</span>
              <p className="text-zinc-300 text-lg font-semibold">No block selected</p>
              <p className="text-zinc-500 text-sm">Pick an item from the sidebar to view its recipe</p>
            </div>
          )}
        </div>
        <Bottombar />
      </div>
    </main>
  )
}