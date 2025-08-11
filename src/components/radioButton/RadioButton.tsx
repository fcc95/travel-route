interface IProps {
  selectedType: string;
  setSelectedType: (value: string) => void;
  value: string;
  label: string;
}

const RadioButton = ({
  selectedType,
  setSelectedType,
  value,
  label,
}: IProps) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="radio"
        name="nodeType"
        value={value}
        checked={selectedType === value}
        onChange={(e) => setSelectedType(e.target.value)}
        className="text-blue-600 focus:ring-blue-500"
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
};

export default RadioButton;
