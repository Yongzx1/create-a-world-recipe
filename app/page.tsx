"use client"

import { useState } from "react"
import Sidebar from "@/components/ui/sidebar"  
import RecipeTree from "@/components/ui/RecipeTree"
import { items } from "@/data/items"

export default function Home() {
  const [selectedItemId, setSelectedItemId] = useState(items[1]?.id ?? items[0]?.id)

  return (
    <main className="flex">
      <Sidebar selectedItemId={selectedItemId} onSelectItem={setSelectedItemId} />
      <RecipeTree selectedItemId={selectedItemId} />
    </main>
  )
}