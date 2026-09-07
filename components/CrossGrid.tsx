import React from "react";

export type CrossGridVariant =
  | "staircase"
  | "crosshair"
  | "corner-step"
  | "horizontal-strip"
  | "constellation"
  | "diagonal-fade"
  | "corner-dense"
  | "scatter";

export interface CrossGridProps {
  variant?: CrossGridVariant;
  /** @deprecated use variant instead */
  pattern?: "reference-accent" | "diagonal-fade" | "corner-dense" | "scatter" | "random";
  rows?: number;
  cols?: number;
  cellSize?: number;
  gap?: number;
  armLength?: number;
  strokeWidth?: number;
  solidColor?: string;
  ghostColor?: string;
  anchorCorner?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
  className?: string;
  style?: React.CSSProperties;
}

interface Segment {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  isSolid: boolean;
}

export default function CrossGrid({
  variant,
  pattern,
  rows: propRows,
  cols: propCols,
  cellSize: propCellSize,
  gap: propGap,
  armLength,
  strokeWidth = 2,
  solidColor = "#14283D",
  ghostColor = "rgba(20, 40, 61, 0.15)",
  anchorCorner = "bottom-left",
  className = "",
  style = {},
}: CrossGridProps) {
  // Normalize variant vs legacy pattern
  let activeVariant: CrossGridVariant = "staircase";
  if (variant) {
    activeVariant = variant;
  } else if (pattern) {
    if (pattern === "reference-accent") activeVariant = "staircase";
    else if (pattern === "corner-dense") activeVariant = "corner-step";
    else if (pattern === "scatter" || pattern === "random") activeVariant = "constellation";
    else activeVariant = "diagonal-fade";
  }

  // Set default dimensions per variant
  let defCols = 4;
  let defRows = 4;
  let defCellSize = 54;
  let defGap = 12;

  switch (activeVariant) {
    case "crosshair":
      defCols = 3;
      defRows = 3;
      defCellSize = 56;
      defGap = 12;
      break;
    case "corner-step":
      defCols = 4;
      defRows = 3;
      defCellSize = 48;
      defGap = 11;
      break;
    case "horizontal-strip":
      defCols = 6;
      defRows = 2;
      defCellSize = 50;
      defGap = 11;
      break;
    case "constellation":
      defCols = 4;
      defRows = 3;
      defCellSize = 52;
      defGap = 12;
      break;
    case "staircase":
    default:
      defCols = 4;
      defRows = 4;
      defCellSize = 54;
      defGap = 12;
      break;
  }

  const cols = propCols ?? defCols;
  const rows = propRows ?? defRows;
  const cellSize = propCellSize ?? defCellSize;
  const gap = propGap ?? defGap;
  const actualArmLength = armLength ?? Math.max(16, cellSize - gap);
  const halfGap = gap / 2;
  const pad = actualArmLength + 4;
  const width = (cols - 1) * cellSize + actualArmLength * 2 + 8;
  const height = (rows - 1) * cellSize + actualArmLength * 2 + 8;

  const colXs: number[] = [];
  for (let c = 0; c < cols; c++) {
    colXs.push(pad + c * cellSize);
  }
  const rowYs: number[] = [];
  for (let r = 0; r < rows; r++) {
    rowYs.push(pad + r * cellSize);
  }

  const segments: Segment[] = [];

  // 1. VARIANT: STAIRCASE (Signature reference pattern from about section)
  if (activeVariant === "staircase" && cols === 4 && rows === 4) {
    const hConfigs = [
      { r: 0, c1: 2, c2: 3, solid: false },
      { r: 1, c1: 0, c2: 1, solid: true },
      { r: 1, c1: 1, c2: 2, solid: true },
      { r: 1, c1: 2, c2: 3, solid: false },
      { r: 2, c1: 0, c2: 1, solid: false },
      { r: 2, c1: 1, c2: 2, solid: true },
      { r: 2, c1: 2, c2: 3, solid: true },
    ];
    hConfigs.forEach((h, idx) => {
      segments.push({
        id: "stair-h-" + idx,
        x1: colXs[h.c1] + halfGap,
        y1: rowYs[h.r],
        x2: colXs[h.c2] - halfGap,
        y2: rowYs[h.r],
        isSolid: h.solid,
      });
    });

    const vConfigs = [
      { c: 0, r1: 1, r2: 2, solid: false },
      { c: 0, r1: 2, r2: 3, solid: false },
      { c: 1, r1: 0, r2: 1, solid: true },
      { c: 1, r1: 1, r2: 2, solid: true },
      { c: 1, r1: 2, r2: 3, solid: false },
      { c: 2, r1: 0, r2: 1, solid: false },
      { c: 2, r1: 1, r2: 2, solid: true },
      { c: 2, r1: 2, r2: 3, solid: true },
      { c: 3, r1: 0, r2: 1, solid: false },
    ];
    vConfigs.forEach((v, idx) => {
      segments.push({
        id: "stair-v-" + idx,
        x1: colXs[v.c],
        y1: rowYs[v.r1] + halfGap,
        x2: colXs[v.c],
        y2: rowYs[v.r2] - halfGap,
        isSolid: v.solid,
      });
    });

    // Ghost arms
    segments.push(
      { id: "arm-top-c2", x1: colXs[2], y1: rowYs[0] - actualArmLength, x2: colXs[2], y2: rowYs[0] - halfGap, isSolid: false },
      { id: "arm-top-c3", x1: colXs[3], y1: rowYs[0] - actualArmLength, x2: colXs[3], y2: rowYs[0] - halfGap, isSolid: false },
      { id: "arm-right-r0", x1: colXs[3] + halfGap, y1: rowYs[0], x2: colXs[3] + actualArmLength, y2: rowYs[0], isSolid: false },
      { id: "arm-left-r2", x1: colXs[0] - actualArmLength, y1: rowYs[2], x2: colXs[0] - halfGap, y2: rowYs[2], isSolid: false },
      { id: "arm-bottom-c0", x1: colXs[0], y1: rowYs[3] + halfGap, x2: colXs[0], y2: rowYs[3] + actualArmLength, isSolid: false }
    );
    // Solid projection arms
    segments.push(
      { id: "arm-solid-top-c1", x1: colXs[1], y1: rowYs[0] - actualArmLength, x2: colXs[1], y2: rowYs[0] - halfGap, isSolid: true },
      { id: "arm-solid-left-r1", x1: colXs[0] - actualArmLength, y1: rowYs[1], x2: colXs[0] - halfGap, y2: rowYs[1], isSolid: true },
      { id: "arm-solid-right-r2", x1: colXs[3] + halfGap, y1: rowYs[2], x2: colXs[3] + actualArmLength, y2: rowYs[2], isSolid: true },
      { id: "arm-solid-bottom-c2", x1: colXs[2], y1: rowYs[3] + halfGap, x2: colXs[2], y2: rowYs[3] + actualArmLength, isSolid: true }
    );
  }

  // 2. VARIANT: CROSSHAIR (Single bold focal broken crosshair with surrounding blueprint grid)
  else if (activeVariant === "crosshair" && cols === 3 && rows === 3) {
    for (let r = 0; r < rows; r++) {
      const cy = rowYs[r];
      // left arm
      segments.push({
        id: "ch-arm-left-" + r,
        x1: pad - actualArmLength,
        y1: cy,
        x2: pad - halfGap,
        y2: cy,
        isSolid: r === 1,
      });
      // inner
      for (let c = 0; c < cols - 1; c++) {
        segments.push({
          id: "ch-h-" + r + "-" + c,
          x1: colXs[c] + halfGap,
          y1: cy,
          x2: colXs[c + 1] - halfGap,
          y2: cy,
          isSolid: r === 1,
        });
      }
      // right arm
      segments.push({
        id: "ch-arm-right-" + r,
        x1: colXs[cols - 1] + halfGap,
        y1: cy,
        x2: colXs[cols - 1] + actualArmLength,
        y2: cy,
        isSolid: r === 1,
      });
    }

    for (let c = 0; c < cols; c++) {
      const cx = colXs[c];
      // top arm
      segments.push({
        id: "ch-arm-top-" + c,
        x1: cx,
        y1: pad - actualArmLength,
        x2: cx,
        y2: pad - halfGap,
        isSolid: c === 1,
      });
      // inner
      for (let r = 0; r < rows - 1; r++) {
        segments.push({
          id: "ch-v-" + c + "-" + r,
          x1: cx,
          y1: rowYs[r] + halfGap,
          x2: cx,
          y2: rowYs[r + 1] - halfGap,
          isSolid: c === 1,
        });
      }
      // bottom arm
      segments.push({
        id: "ch-arm-bottom-" + c,
        x1: cx,
        y1: rowYs[rows - 1] + halfGap,
        x2: cx,
        y2: rowYs[rows - 1] + actualArmLength,
        isSolid: c === 1,
      });
    }
  }

  // 3. VARIANT: CORNER-STEP (Ascending 3-tier staircase with delicate ghost lines and vertical anchor)
  else if (activeVariant === "corner-step" && cols === 4 && rows === 3) {
    // Horizontal tiers
    for (let r = 0; r < 3; r++) {
      const maxC = r + 2; // r=0: 2 cols (c=0-1), r=1: 3 cols (c=0-2), r=2: 4 cols (c=0-3)
      for (let c = 0; c < Math.min(maxC - 1, 3); c++) {
        segments.push({
          id: "step-h-" + r + "-" + c,
          x1: colXs[c] + halfGap,
          y1: rowYs[r],
          x2: colXs[c + 1] - halfGap,
          y2: rowYs[r],
          isSolid: false,
        });
      }
    }
    // Vertical columns
    for (let c = 0; c < 4; c++) {
      const minR = Math.max(0, c - 1);
      for (let r = minR; r < 2; r++) {
        const isSolid = c === 2 && r === 1;
        segments.push({
          id: "step-v-" + c + "-" + r,
          x1: colXs[c],
          y1: rowYs[r] + halfGap,
          x2: colXs[c],
          y2: rowYs[r + 1] - halfGap,
          isSolid,
        });
      }
    }
    // Solid anchor stroke extending downwards
    segments.push({
      id: "step-anchor-bottom",
      x1: colXs[2],
      y1: rowYs[2] + halfGap,
      x2: colXs[2],
      y2: rowYs[2] + actualArmLength,
      isSolid: true,
    });
  }

  // 4. VARIANT: HORIZONTAL-STRIP (Panoramic blueprint ribbon with staggered solid crosshairs)
  else if (activeVariant === "horizontal-strip" && cols === 6 && rows === 2) {
    for (let r = 0; r < 2; r++) {
      segments.push({
        id: "strip-arm-left-" + r,
        x1: pad - actualArmLength,
        y1: rowYs[r],
        x2: pad - halfGap,
        y2: rowYs[r],
        isSolid: false,
      });
      for (let c = 0; c < 5; c++) {
        const isSolid = (r === 0 && c === 1) || (r === 1 && c === 3);
        segments.push({
          id: "strip-h-" + r + "-" + c,
          x1: colXs[c] + halfGap,
          y1: rowYs[r],
          x2: colXs[c + 1] - halfGap,
          y2: rowYs[r],
          isSolid,
        });
      }
      segments.push({
        id: "strip-arm-right-" + r,
        x1: colXs[5] + halfGap,
        y1: rowYs[r],
        x2: colXs[5] + actualArmLength,
        y2: rowYs[r],
        isSolid: false,
      });
    }
    for (let c = 0; c < 6; c++) {
      const isSolid = c === 1 || c === 4;
      segments.push(
        {
          id: "strip-top-" + c,
          x1: colXs[c],
          y1: rowYs[0] - actualArmLength,
          x2: colXs[c],
          y2: rowYs[0] - halfGap,
          isSolid,
        },
        {
          id: "strip-v-" + c,
          x1: colXs[c],
          y1: rowYs[0] + halfGap,
          x2: colXs[c],
          y2: rowYs[1] - halfGap,
          isSolid,
        },
        {
          id: "strip-bot-" + c,
          x1: colXs[c],
          y1: rowYs[1] + halfGap,
          x2: colXs[c],
          y2: rowYs[1] + actualArmLength,
          isSolid,
        }
      );
    }
  }

  // 5. VARIANT: CONSTELLATION (Asymmetric blueprint constellation with 3 distributed accents)
  else if (activeVariant === "constellation" && cols === 4 && rows === 3) {
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const isSolid = (r === 1 && c === 0) || (r === 0 && c === 1) || (r === 2 && c === 2);
        segments.push({
          id: "const-h-" + r + "-" + c,
          x1: colXs[c] + halfGap,
          y1: rowYs[r],
          x2: colXs[c + 1] - halfGap,
          y2: rowYs[r],
          isSolid,
        });
      }
    }
    for (let c = 0; c < 4; c++) {
      for (let r = 0; r < 2; r++) {
        const isSolid = (c === 0 && r === 0) || (c === 2 && r === 0) || (c === 3 && r === 1);
        segments.push({
          id: "const-v-" + c + "-" + r,
          x1: colXs[c],
          y1: rowYs[r] + halfGap,
          x2: colXs[c],
          y2: rowYs[r + 1] - halfGap,
          isSolid,
        });
      }
    }
    // Distinct projection arms
    segments.push(
      { id: "const-arm-l", x1: colXs[0] - actualArmLength, y1: rowYs[1], x2: colXs[0] - halfGap, y2: rowYs[1], isSolid: true },
      { id: "const-arm-t", x1: colXs[2], y1: rowYs[0] - actualArmLength, x2: colXs[2], y2: rowYs[0] - halfGap, isSolid: true },
      { id: "const-arm-b", x1: colXs[3], y1: rowYs[2] + halfGap, x2: colXs[3], y2: rowYs[2] + actualArmLength, isSolid: true }
    );
  }

  // 6. GENERIC DYNAMIC FALLBACK (Custom rows/cols or dynamic diagonal-fade / scatter)
  else {
    const getDist = (c: number, r: number) => {
      const u = cols > 1 ? c / (cols - 1) : 0.5;
      const v = rows > 1 ? r / (rows - 1) : 0.5;
      let dx = u;
      let dy = 1 - v;
      if (anchorCorner === "bottom-left") {
        dx = u;
        dy = 1 - v;
      } else if (anchorCorner === "bottom-right") {
        dx = 1 - u;
        dy = 1 - v;
      } else if (anchorCorner === "top-left") {
        dx = u;
        dy = v;
      } else if (anchorCorner === "top-right") {
        dx = 1 - u;
        dy = v;
      }
      return Math.sqrt(dx * dx + dy * dy) / Math.SQRT2;
    };

    for (let r = 0; r < rows; r++) {
      const cy = rowYs[r];
      const leftDist = getDist(0, r);
      if (leftDist <= 0.85) {
        segments.push({
          id: "dyn-arm-left-" + r,
          x1: colXs[0] - actualArmLength,
          y1: cy,
          x2: colXs[0] - halfGap,
          y2: cy,
          isSolid: leftDist <= 0.48,
        });
      }
      for (let c = 0; c < cols - 1; c++) {
        const midDist = (getDist(c, r) + getDist(c + 1, r)) / 2;
        if (midDist <= 0.88) {
          const isSolid = midDist <= 0.48 || (midDist <= 0.62 && (r + c) % 2 === 0);
          segments.push({
            id: "dyn-h-" + r + "-" + c,
            x1: colXs[c] + halfGap,
            y1: cy,
            x2: colXs[c + 1] - halfGap,
            y2: cy,
            isSolid,
          });
        }
      }
      const rightDist = getDist(cols - 1, r);
      if (rightDist <= 0.85) {
        segments.push({
          id: "dyn-arm-right-" + r,
          x1: colXs[cols - 1] + halfGap,
          y1: cy,
          x2: colXs[cols - 1] + actualArmLength,
          y2: cy,
          isSolid: rightDist <= 0.48,
        });
      }
    }

    for (let c = 0; c < cols; c++) {
      const cx = colXs[c];
      const topDist = getDist(c, 0);
      if (topDist <= 0.85) {
        segments.push({
          id: "dyn-arm-top-" + c,
          x1: cx,
          y1: rowYs[0] - actualArmLength,
          x2: cx,
          y2: rowYs[0] - halfGap,
          isSolid: topDist <= 0.48,
        });
      }
      for (let r = 0; r < rows - 1; r++) {
        const midDist = (getDist(c, r) + getDist(c, r + 1)) / 2;
        if (midDist <= 0.88) {
          const isSolid = midDist <= 0.48 || (midDist <= 0.62 && (r + c) % 2 === 0);
          segments.push({
            id: "dyn-v-" + c + "-" + r,
            x1: cx,
            y1: rowYs[r] + halfGap,
            x2: cx,
            y2: rowYs[r + 1] - halfGap,
            isSolid,
          });
        }
      }
      const bottomDist = getDist(c, rows - 1);
      if (bottomDist <= 0.85) {
        segments.push({
          id: "dyn-arm-bottom-" + c,
          x1: cx,
          y1: rowYs[rows - 1] + halfGap,
          x2: cx,
          y2: rowYs[rows - 1] + actualArmLength,
          isSolid: bottomDist <= 0.48,
        });
      }
    }
  }

  const viewBoxStr = "0 0 " + width + " " + height;
  const classNameStr = "select-none pointer-events-none " + className;

  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBoxStr}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classNameStr}
      style={style}
      aria-hidden="true"
    >
      {segments.map((seg) => (
        <line
          key={seg.id}
          x1={seg.x1}
          y1={seg.y1}
          x2={seg.x2}
          y2={seg.y2}
          stroke={seg.isSolid ? solidColor : ghostColor}
          strokeWidth={strokeWidth}
          strokeLinecap="square"
        />
      ))}
    </svg>
  );
}
