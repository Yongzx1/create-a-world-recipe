"use client"

import { useState } from "react"
import Sidebar from "@/components/ui/sidebar"
import RecipeTree from "@/components/ui/RecipeTree"
import Topbar from "@/components/ui/Topbar"
import Bottombar from "@/components/ui/Bottombar"
import { items } from "@/data/items"

export default function Home() {
  const [selectedItemId, setSelectedItemId] = useState(items[1]?.id ?? items[0]?.id)
  const [direction, setDirection] = useState<"result-top" | "result-bottom">("result-top")

  return (
    <main className="flex h-screen">
      <Sidebar selectedItemId={selectedItemId} onSelectItem={setSelectedItemId} />
      <div className="flex flex-col flex-1 min-w-0">
        <Topbar direction={direction} onDirectionChange={setDirection} />
        <RecipeTree selectedItemId={selectedItemId} direction={direction} />
        <Bottombar />
      </div>
    </main>
  )
}