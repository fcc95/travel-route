interface IProps {
  onClick: () => void;
  label: string;
}

const Button = ({ onClick, label }: IProps) => {
  return (
    <button className="px-3 py-1 border rounded bg-white" onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
