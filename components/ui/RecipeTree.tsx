"use client"

import React from "react"
import ReactFlow, {
  Node,
  Edge,
  ReactFlowProvider,
  Background,
  Position,
} from "react-flow-renderer"
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

  // Build a small multi-level graph so that
  // - level 0: selected item
  // - level 1: its ingredients
  // - level 2: ingredients of those ingredients (e.g. gravel for sand)
  const maxDepth = 2
  const nodeLevels: Record<string, number> = { [selectedItem.id]: 0 }
  const layers: string[][] = [[selectedItem.id]]
  const edges: Edge[] = []

  const queue: { id: string; level: number }[] = [{ id: selectedItem.id, level: 0 }]

  while (queue.length) {
    const { id, level } = queue.shift()!
    if (level >= maxDepth) continue

    const ingredientIds = recipes[id] ?? []

    ingredientIds.forEach((ingredientId, ingredientIndex) => {
      edges.push({
        id: `e-${ingredientId}-${id}`,
        source: ingredientId,
        target: id,
        sourcePosition: Position.Top,
        targetPosition: Position.Bottom,
        targetHandle: ingredientIndex % 2 === 0 ? "target-left" : "target-right",
        animated: true,
        style: { stroke: "#38bdf8", strokeWidth: 2 },
      })

      if (nodeLevels[ingredientId] === undefined) {
        const nextLevel = level + 1
        nodeLevels[ingredientId] = nextLevel
        if (!layers[nextLevel]) layers[nextLevel] = []
        layers[nextLevel].push(ingredientId)
        queue.push({ id: ingredientId, level: nextLevel })
      }
    })
  }

  const nodes: Node[] = []

  layers.forEach((layerIds, level) => {
    layerIds.forEach((id, index) => {
      const item = items.find((i) => i.id === id)
      if (!item) return

      const role =
        id === selectedItem.id
          ? "result"
          : recipes[id]
          ? "intermediate"
          : "base"

      nodes.push({
        id: item.id,
        type: "custom",
        data: { label: item.name, icon: item.icon, role },
        position: { x: 100 + index * 220, y: 40 + level * 190 },
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