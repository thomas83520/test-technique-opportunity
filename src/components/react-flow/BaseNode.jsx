import React, { useState } from "react";
import DeleteNodeButton from "../ui/DeleteNodeButton";
import { useNewStepStore } from "../../stores/newStepStore";

export default function BaseNode({ children, nodeId }) {
  const [isHovered, setIsHovered] = useState(false);
  const { editNode } = useNewStepStore();

  return (
    <div
      className="base-node"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => editNode(nodeId)}
    >
      <DeleteNodeButton nodeId={nodeId} showButton={isHovered} />
      {children}
    </div>
  );
}
