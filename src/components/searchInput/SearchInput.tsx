interface IProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: string) => void;
}

const Input = ({ label, placeholder, value, onChange }: IProps) => {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        className="w-full border rounded px-2 py-1 text-black"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Input;
