import React from "react";
import ResultItem from "../resultItem/ResultItem";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import type { ResultItemType } from "../../types";

interface IProps {
  items: ResultItemType[];
  onDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    data: ResultItemType
  ) => void;
  isLoading?: boolean;
  isError?: boolean;
}

const SearchResult = ({ items, onDragStart, isLoading, isError }: IProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner size="md" />
        <span className="ml-2 text-sm text-gray-500">Loading results...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="text-red-500 mb-2">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <div className="text-sm text-red-500 text-center">
          <div>Error loading results</div>
          <div className="text-xs text-gray-500 mt-1">
            Please try again later
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="text-gray-400 mb-2">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <div className="text-sm text-gray-500 text-center">
          <div>No results found</div>
          <div className="text-xs text-gray-400 mt-1">
            Try adjusting your search terms
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <ResultItem
          key={item.id}
          iconSrc={item.thumbnail}
          label={item.name}
          data={item}
          onDragStart={onDragStart}
        />
      ))}
    </div>
  );
};

export default SearchResult;
