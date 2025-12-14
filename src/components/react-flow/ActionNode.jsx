import { Handle, Position } from "@xyflow/react";
import React from "react";
import { HADNLE_TYPE } from "../../constants";
import BaseNode from "./BaseNode";

export default function ActionNode({ data, id }) {
  return (
    <BaseNode nodeId={id}>
      <Handle type="target" position={Position.Top} />
      <Handle
        type="source"
        position={Position.Bottom}
        id={HADNLE_TYPE.SUCCESS}
        style={{ left: "15%", backgroundColor: "green" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id={HADNLE_TYPE.FAIL}
        style={{ left: "85%", backgroundColor: "red" }}
      />
      <Handle type="source" position={Position.Bottom} id={HADNLE_TYPE.NEXT} />
      <div>
        {data.label}-{id}
      </div>
    </BaseNode>
  );
}
