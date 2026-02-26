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
}

const recipes: Record<string, string[]> = {
  grass: ["dirt", "cave-background"],
  gravel: ["dirt", "stone"],
  "cave-gateway": ["cave-background", "stone"],
  "wooden-block": ["dirt", "magma"],
  sand: ["dirt", "gravel"],
}

export default function RecipeTree({ selectedItemId }: RecipeTreeProps) {
  const selectedItem = items.find((item) => item.id === selectedItemId) ?? items[0]

  // Tree (not DAG): if the same ingredient appears in multiple branches,
  // we intentionally render it as a separate node instance for clarity.
  const maxDepth = 2
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

      nodes.push({
        id: instanceId,
        type: "custom",
        data: { label: item.name, icon: item.icon, role },
        position: { x: 100 + index * 220, y: 40 + level * 190 },
        style: { background: "transparent", border: "none" },
      })
    })
  })

  return (
    <ReactFlowProvider>
      <div className="flex-1 w-full h-screen bg-zinc-900">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={{ custom: RecipeNode }}
          fitView
        >
          <Background gap={24} color="#1f2937" />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  )
}