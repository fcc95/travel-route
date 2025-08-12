import React from "react";
import { SearchInput, SearchResult } from "../index";
import type { ResultItemType } from "../../types";

interface SearchSectionProps {
  selectedType: string;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  results: ResultItemType[];
  onDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    item: ResultItemType
  ) => void;
  isLoading: boolean;
  isError: boolean;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  selectedType,
  searchTerm,
  onSearchChange,
  results,
  onDragStart,
  isLoading,
  isError,
}) => {
  return (
    <div className="space-y-4">
      <SearchInput
        label={`Search ${selectedType}`}
        placeholder={`Search ${selectedType}...`}
        value={searchTerm}
        onChange={onSearchChange}
      />

      <SearchResult
        items={results}
        onDragStart={onDragStart}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
};

export default SearchSection;
