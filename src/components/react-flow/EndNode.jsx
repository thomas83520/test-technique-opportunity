import { Handle, Position } from "@xyflow/react";
import React from "react";
import BaseNode from "./BaseNode";

export default function EndNode({ id }) {
  return (
    <BaseNode nodeId={id}>
      <Handle type="target" position={Position.Top} />
      <div>END-{id}</div>
    </BaseNode>
  );
}
