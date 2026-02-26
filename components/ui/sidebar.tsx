"use client"

import Image from "next/image"
import { Input } from "@/components/ui/input"
import { items } from "@/data/items"

type SidebarProps = {
  selectedItemId: string
  onSelectItem: (id: string) => void
}

export default function Sidebar({ selectedItemId, onSelectItem }: SidebarProps) {
  return (
    <div className="w-72 border-r border-zinc-800 h-screen p-4 space-y-4 bg-zinc-950 text-white">
      <Input placeholder="Search items..." />

      <div className="space-y-2 overflow-y-auto">
        {items.map((item) => {
          const isSelected = item.id === selectedItemId

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectItem(item.id)}
              className={`w-full flex items-center gap-2 p-2 rounded cursor-pointer text-left ${
                isSelected ? "bg-zinc-800" : "hover:bg-zinc-800"
              }`}
            >
              <Image
                src={item.icon}
                alt={item.name}
                width={32}
                height={32}
              />
              <span>{item.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}