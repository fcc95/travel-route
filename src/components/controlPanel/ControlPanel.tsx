import React from "react";
import Button from "../button/Button";

interface ControlPanelProps {
  onSave: () => void;
  onLoad: () => void;
  onClear: () => void;
  message: string;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  onSave,
  onLoad,
  onClear,
  message,
}) => {
  const isErrorMessage =
    message.includes("Invalid") || message.includes("Failed");

  return (
    <div className="absolute z-10 left-2 top-2 flex gap-2">
      <Button onClick={onSave} label="Save" />
      <Button onClick={onLoad} label="Load" />
      <Button onClick={onClear} label="Clear" />

      {message && (
        <div
          className={`px-2 py-1 text-xs border rounded text-black ${
            isErrorMessage
              ? "bg-red-50 border-red-200"
              : "bg-yellow-50 border-yellow-200"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default ControlPanel;
