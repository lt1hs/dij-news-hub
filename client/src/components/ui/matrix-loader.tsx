import type { CSSProperties } from "react";

const DOT_COUNT = 16;
const SCAN_STEP_MS = 120;

export function MatrixLoader() {
  return (
    <span className="t-matrix" data-variant="scan" role="status" aria-label="Loading">
      {Array.from({ length: DOT_COUNT }, (_, index) => (
        <i
          key={index}
          aria-hidden="true"
          style={{ "--d": (index % 4) * SCAN_STEP_MS } as CSSProperties}
        />
      ))}
    </span>
  );
}
