import React, { useState, useEffect } from "react";
import { RadioButton, SearchResult, SearchInput } from "../../components";
import { NodeTypes } from "../../enums/nodeEnums";
import type { ResultItemType } from "../../types";
import { IMAGES } from "../../constants";

// Type for country data from REST Countries API
type CountryApiData = {
  cca2: string;
  name: {
    common: string;
  };
  flags: {
    png: string;
  };
};

const NodeList = [
  {
    id: NodeTypes.Country,
    label: "Country",
  },
  {
    id: NodeTypes.Place,
    label: "Place",
  },
  {
    id: NodeTypes.Hotel,
    label: "Hotel",
  },
  {
    id: NodeTypes.Airport,
    label: "Airport",
  },
  {
    id: NodeTypes.Other,
    label: "Other",
  },
];

const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [results, setResults] = useState<Array<ResultItemType>>([]);

  const [selectedType, setSelectedType] = useState<NodeTypes>(
    NodeTypes.Country
  );

  // todo maybe make more clear
  useEffect(() => {
    if (!searchTerm) {
      setResults([]);
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

    const handler = setTimeout(() => setDebouncedValue(searchTerm.trim()), 300);

    return () => clearTimeout(handler);
  }, [searchTerm, selectedType]);

  // Fetch countries from REST Countries API
  useEffect(() => {
    const fetchCountries = async () => {
      if (!debouncedValue) {
        setResults([]);
        return;
      }

      try {
        const res = await fetch(
          `https://restcountries.com/v3.1/name/${debouncedValue}?fields=name,cca2,flags`
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        const mappedCountries = data.map((country: CountryApiData) => ({
          id: country.cca2,
          name: country.name.common,
          thumbnail: country.flags.png,
        }));
        setResults(mappedCountries);
      } catch (err) {
        console.error(err);
        setResults([]);
      }
    };

    fetchCountries();
  }, [debouncedValue]);

  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    item: ResultItemType
  ) => {
    e.dataTransfer.setData("application/json", JSON.stringify(item));
    e.dataTransfer.effectAllowed = "move";
  };

  const onRadioButtonChange = (value: string) => {
    setSearchTerm("");
    setSelectedType(value as NodeTypes);
  };

  return (
    <aside className="p-3 w-72 border-r bg-gray-50 h-full overflow-auto">
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Select Node Type
        </h3>

        <div className="space-y-2">
          {NodeList.map((item) => (
            <RadioButton
              key={item.id}
              selectedType={selectedType}
              setSelectedType={onRadioButtonChange}
              value={item.id}
              label={item.label}
            />
          ))}
        </div>
      </div>

      <SearchInput
        label={`Search ${selectedType}`}
        placeholder={`Search ${selectedType}...`}
        value={searchTerm}
        onChange={setSearchTerm}
      />

      <SearchResult items={results} onDragStart={onDragStart} />
    </aside>
  );
};

export default Sidebar;
