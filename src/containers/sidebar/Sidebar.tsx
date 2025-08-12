import React from "react";
import { NodeTypeSelector, SearchSection } from "../../components";
import { useSearch } from "../../hooks";
import type { ResultItemType } from "../../types";

const Sidebar = () => {
  const {
    searchTerm,
    setSearchTerm,
    selectedType,
    results,
    isLoading,
    isError,
    handleTypeChange,
  } = useSearch();

  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    item: ResultItemType
  ) => {
    e.dataTransfer.setData("application/json", JSON.stringify(item));
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="p-3 w-72 border-r bg-gray-50 h-full overflow-auto">
      <NodeTypeSelector
        selectedType={selectedType}
        onTypeChange={handleTypeChange}
      />

      <SearchSection
        selectedType={selectedType}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        results={results}
        onDragStart={onDragStart}
        isLoading={isLoading}
        isError={isError}
      />
    </aside>
  );
};

export default Sidebar;
