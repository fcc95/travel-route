import React from "react";
import RadioButton from "../radioButton/RadioButton";
import { NodeTypes } from "../../enums/nodeEnums";
import { NODE_TYPE_LIST } from "../../constants";

interface NodeTypeSelectorProps {
  selectedType: NodeTypes;
  onTypeChange: (value: string) => void;
}

const NodeTypeSelector: React.FC<NodeTypeSelectorProps> = ({
  selectedType,
  onTypeChange,
}) => {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium text-gray-700 mb-2">
        Select Node Type
      </h3>
      <div className="space-y-2">
        {NODE_TYPE_LIST.map((item) => (
          <RadioButton
            key={item.id}
            selectedType={selectedType}
            setSelectedType={onTypeChange}
            value={item.id}
            label={item.label}
          />
        ))}
      </div>
    </div>
  );
};

export default NodeTypeSelector;
