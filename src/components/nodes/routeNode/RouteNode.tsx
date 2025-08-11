import { Handle, Position } from "@xyflow/react";
import type { NodeElementType } from "../../../types";

interface IProps {
  data: NodeElementType;
}

const RouteNode = ({ data }: IProps) => {
  return (
    <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg shadow-md p-3 w-48">
      <img
        src={data.thumbnail}
        alt={`${data.name} flag`}
        className="w-10 h-10 rounded object-cover"
      />
      <div className="flex-1 min-w-0">
        <span className="text-gray-800 font-medium truncate block">
          {data.name}
        </span>
        {data.connectionCount && data.connectionCount > 0 && (
          <span className="text-xs text-blue-600 font-medium">
            {data.connectionCount} route{data.connectionCount > 1 ? "s" : ""}
          </span>
        )}
      </div>
      <Handle type="target" position={Position.Left} className="!w-2 !h-2" />
      <Handle type="source" position={Position.Right} className="!w-2 !h-2" />
    </div>
  );
};

export default RouteNode;
