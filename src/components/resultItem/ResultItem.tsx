import type { ResultItemType } from "../../types";

interface IProps {
  iconSrc: string;
  label: string;
  data: ResultItemType;
  onDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    data: ResultItemType
  ) => void;
}

const ResultItem = ({ iconSrc, label, data, onDragStart }: IProps) => (
  <div
    draggable
    onDragStart={(e) => onDragStart(e, data)}
    className="flex items-center gap-2 p-4 bg-white rounded border cursor-grab"
    role="button"
    aria-label={`Drag ${label}`}
  >
    <img src={iconSrc} width={20} height={14} alt={label} />
    <span className="text-black truncate">{label}</span>
  </div>
);

export default ResultItem;
