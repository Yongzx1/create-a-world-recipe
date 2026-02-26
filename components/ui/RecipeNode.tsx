import React from "react"
import Image from "next/image"
import { Handle, Position } from "react-flow-renderer"

type NodeRole = "result" | "intermediate" | "base"

interface RecipeNodeProps {
  data: { label: string; icon: string; role: NodeRole }
}

const RecipeNode: React.FC<RecipeNodeProps> = ({ data }) => {
  const { label, icon, role } = data

  const baseCardClasses =
    "flex flex-col items-center justify-center rounded-2xl border px-5 py-4 shadow-lg min-w-[150px]"

  const roleClasses: Record<NodeRole, string> = {
    result:
      "bg-amber-900/40 border-amber-400/80 shadow-[0_0_25px_rgba(251,191,36,0.75)]",
    intermediate:
      "bg-sky-950/50 border-sky-500/60 shadow-[0_0_18px_rgba(56,189,248,0.45)]",
    base:
      "bg-emerald-950/50 border-emerald-500/60 shadow-[0_0_18px_rgba(52,211,153,0.45)]",
  }

  const titleColor: Record<NodeRole, string> = {
    result: "text-amber-200",
    intermediate: "text-sky-200",
    base: "text-emerald-200",
  }

  return (
    <div className={`relative ${baseCardClasses} ${roleClasses[role]}`}>
      {/* Handles depend on node role so connections look tidy */}
      {role === "result" && (
        <>
          <Handle
            id="target-left"
            type="target"
            position={Position.Bottom}
            className="!w-2 !h-2 !bg-slate-400 border-0"
            style={{ left: "32%" }}
          />
          <Handle
            id="target-right"
            type="target"
            position={Position.Bottom}
            className="!w-2 !h-2 !bg-slate-400 border-0"
            style={{ left: "68%" }}
          />
        </>
      )}

      {role === "intermediate" && (
        <>
          <Handle
            id="target-left"
            type="target"
            position={Position.Bottom}
            className="!w-2 !h-2 !bg-slate-400 border-0"
            style={{ left: "32%" }}
          />
          <Handle
            id="target-right"
            type="target"
            position={Position.Bottom}
            className="!w-2 !h-2 !bg-slate-400 border-0"
            style={{ left: "68%" }}
          />
          <Handle
            type="source"
            position={Position.Top}
            className="!w-2 !h-2 !bg-slate-400 border-0"
          />
        </>
      )}

      {role === "base" && (
        <Handle
          type="source"
          position={Position.Top}
          className="!w-2 !h-2 !bg-slate-400 border-0"
        />
      )}

      <div className="mb-2 rounded-xl bg-black/30 p-2">
        <Image src={icon} alt={label} width={56} height={56} className="rounded-md" />
      </div>
      <div className={`text-sm font-semibold tracking-wide ${titleColor[role]}`}>
        {label}
      </div>

      {role === "base" && (
        <span className="mt-1 inline-flex items-center rounded-full border border-emerald-500/70 bg-emerald-900/40 px-3 py-0.5 text-[10px] font-medium tracking-[0.15em] text-emerald-300">
          BASE
        </span>
      )}
    </div>
  )
}

export default RecipeNode