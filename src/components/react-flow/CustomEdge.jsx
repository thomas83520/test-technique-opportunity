import { BaseEdge, getSimpleBezierPath } from "@xyflow/react";
import React from "react";
import { getColorFromSourceHandler } from "../../utils";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourceHandleId,
}) {
  const [edgePath] = getSimpleBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <BaseEdge
      id={id}
      path={edgePath}
      style={{ stroke: getColorFromSourceHandler(sourceHandleId) }}
    />
  );
}
