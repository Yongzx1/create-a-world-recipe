"use client"

import React from "react"
import {
  ReactFlow,
  Node,
  Edge,
  ReactFlowProvider,
  Background,
} from "@xyflow/react"
import RecipeNode from "./RecipeNode"
import { items } from "@/data/items"

type RecipeTreeProps = {
  selectedItemId: string
  direction: "result-top" | "result-bottom"
}

const recipes: Record<string, string[]> = {
  //Rarity 1–3
  "cave-gateway": ["cave-background", "stone"],
  grass: ["dirt", "cave-background"],
  gravel: ["dirt", "stone"],
  "wooden-block": ["dirt", "magma"],
  "agaric-mushroom": ["cave-background", "grass"],
  concrete: ["gravel", "stone"],
  "glass-pane": ["magma", "gravel"],
  sand: ["dirt", "gravel"],
  sunflower: ["grass", "magma"],
  torch: ["wooden-block", "magma"],
  "wooden-background": ["cave-background", "stone"],
  //Rarity 4–6
  "black-block": ["concrete", "cave-background"],
  "brown-block": ["concrete", "dirt"],
  "glass-block": ["sand", "magma"],
  "wooden-frame": ["grass", "wooden-block"],
  "wooden-sign": ["cave-background", "wooden-background"],
  cactus: ["grass", "sand"],
  "corn-flower": ["grass", "glass-pane"],
  "green-block": ["grass", "concrete"],
  "wooden-crate": ["dirt", "wooden-sign"],
  "wooden-log": ["wooden-block", "wooden-background"],
  "red-block": ["concrete", "agaric-mushroom"],
  "orange-block": ["yellow-block", "red-block"],
  "white-block": ["concrete", "glass-pane"],
  "yellow-block": ["sunflower", "concrete"],
  leaves: ["grass", "wooden-block"],
}

export default function RecipeTree({ selectedItemId, direction }: RecipeTreeProps) {
  const selectedItem = items.find((item) => item.id === selectedItemId) ?? items[0]

  const maxDepth = 5
  const layers: { instanceId: string; itemId: string }[][] = [
    [{ instanceId: selectedItem.id, itemId: selectedItem.id }],
  ]
  const edges: Edge[] = []

  const queue: { instanceId: string; itemId: string; level: number }[] = [
    { instanceId: selectedItem.id, itemId: selectedItem.id, level: 0 },
  ]

  while (queue.length) {
    const { instanceId, itemId, level } = queue.shift()!
    if (level >= maxDepth) continue

    const ingredientIds = recipes[itemId] ?? []

    ingredientIds.forEach((ingredientId, ingredientIndex) => {
      const childInstanceId = `${ingredientId}__${instanceId}__${ingredientIndex}`

      edges.push({
        id: `e-${childInstanceId}-${instanceId}`,
        source: childInstanceId,
        target: instanceId,
        targetHandle: "target",
        animated: true,
        style: { stroke: "#38bdf8", strokeWidth: 2 },
      })

      const nextLevel = level + 1
      if (!layers[nextLevel]) layers[nextLevel] = []
      layers[nextLevel].push({ instanceId: childInstanceId, itemId: ingredientId })
      queue.push({ instanceId: childInstanceId, itemId: ingredientId, level: nextLevel })
    })
  }

  const nodes: Node[] = []

layers.forEach((layer, level) => {
  layer.forEach(({ instanceId, itemId }, index) => {
    const item = items.find((i) => i.id === itemId)
    if (!item) return

    const role =
      instanceId === selectedItem.id
        ? "result"
        : recipes[itemId]
          ? "intermediate"
          : "base"

    const y =
      direction === "result-top"
        ? 40 + level * 190
        : 40 + (maxDepth - level) * 190

    const ingredientNames = (recipes[itemId] ?? []).map(
      (id) => items.find((i) => i.id === id)?.name ?? id
    )

    nodes.push({
      id: instanceId,
      type: "custom",
      data: { label: item.name, icon: item.icon, role, recipe: ingredientNames },
      position: { x: 100 + index * 220, y },
      style: { background: "transparent", border: "none" },
    })
  })
})

  return (
    <ReactFlowProvider>
      <div className="flex-1 w-full h-full bg-zinc-900">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={{ custom: RecipeNode }}
          fitView
          proOptions={{ hideAttribution: true }}
        >
          <Background gap={24} color="#1f2937" />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  )
}