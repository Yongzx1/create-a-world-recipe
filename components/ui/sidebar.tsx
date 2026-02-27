"use client"

import { useState } from "react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { items } from "@/data/items"

type SidebarProps = {
  selectedItemId: string | null
  onSelectItem: (id: string) => void
}

export default function Sidebar({ selectedItemId, onSelectItem }: SidebarProps) {
  const [search, setSearch] = useState("")

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="w-64 md:w-72 border-r border-zinc-800 h-full flex flex-col gap-4 p-4 bg-zinc-950 text-white">
      <Input
        placeholder="Search items..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="flex-1 overflow-y-auto min-h-0 space-y-1 sidebar-scroll">
        {filteredItems.map((item) => {
          const isSelected = item.id === selectedItemId
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectItem(item.id)}
              className={`w-full flex items-center gap-2 p-2 rounded cursor-pointer text-left transition-colors active:bg-zinc-700 ${
                isSelected ? "bg-zinc-800" : "hover:bg-zinc-800"
              }`}
            >
              <Image src={item.icon} alt={item.name} width={24} height={24} />
              <span className="text-sm">{item.name}</span>
            </button>
          )
        })}
        {filteredItems.length === 0 && (
          <p className="text-zinc-500 text-sm text-center pt-4">No items found</p>
        )}
      </div>
    </div>
  )
}