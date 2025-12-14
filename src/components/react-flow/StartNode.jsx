import { Handle, Position } from "@xyflow/react";
import BaseNode from "./BaseNode";

export default function StartNode({ id }) {
  return (
    <BaseNode nodeId={id}>
      <Handle type="source" position={Position.Bottom} />
      <div>START-{id}</div>
    </BaseNode>
  );
}
