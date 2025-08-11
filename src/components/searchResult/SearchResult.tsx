import ResultItem from "../resultItem/ResultItem";
import type { ResultItemType } from "../../types";

interface IProps {
  items: ResultItemType[];
  onDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    data: ResultItemType
  ) => void;
}

const SearchResult = ({ items, onDragStart }: IProps) => {
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
