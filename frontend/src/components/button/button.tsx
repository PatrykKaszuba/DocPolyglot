import classNames from "classnames";

interface ButtonProps {
  text: string;
  color: "primary" | "secondary";
  onClick?: () => void;
}

export const Button = ({ text, color, onClick }: ButtonProps) => {
  return (
    <button
      type="button"
      className={classNames(
        "cursor-pointer self-end rounded-lg border px-4 py-2",
        color === "primary"
          ? "border-blue-600 bg-blue-600 text-white"
          : "border-gray-300 bg-white text-blue-600",
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
