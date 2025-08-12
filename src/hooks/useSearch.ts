import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { NodeTypes } from "../enums/nodeEnums";
import type { ResultItemType } from "../types";
import { IMAGES } from "../constants";
import { fetchCountries } from "../services";

export const useSearch = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [results, setResults] = useState<Array<ResultItemType>>([]);
  const [selectedType, setSelectedType] = useState<NodeTypes>(
    NodeTypes.Country
  );

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      setDebouncedValue("");
      queryClient.removeQueries({ queryKey: ["countries"], exact: false });
      return;
    }

    if (selectedType !== NodeTypes.Country) {
      setResults([
        {
          id: `node_${Date.now()}`,
          name: searchTerm,
          thumbnail: IMAGES[selectedType],
        },
      ]);
      return;
    }

    const t = setTimeout(() => {
      setDebouncedValue(searchTerm.trim());
    }, 300);
    return () => clearTimeout(t);
  }, [searchTerm, selectedType, queryClient]);

  const {
    data: countryResults = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["countries", debouncedValue],
    queryFn: () => fetchCountries(debouncedValue),
    enabled: selectedType === NodeTypes.Country && !!debouncedValue,
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  useEffect(() => {
    if (selectedType !== NodeTypes.Country) return;

    if (!searchTerm.trim() || !debouncedValue) {
      setResults([]);
      return;
    }

    setResults(countryResults || []);
  }, [countryResults, selectedType, searchTerm, debouncedValue]);

  const handleTypeChange = (value: string) => {
    setSearchTerm("");
    setDebouncedValue("");
    setSelectedType(value as NodeTypes);
    setResults([]);
    queryClient.removeQueries({ queryKey: ["countries"], exact: false });
  };

  return {
    searchTerm,
    setSearchTerm,
    selectedType,
    results,
    isLoading,
    isError,
    handleTypeChange,
  };
};
