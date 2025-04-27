import { type MouseEvent as ReactMouseEvent } from "react";

type ButtonVariant =
  | "default"
  | "primary"
  | "secondary"
  | "danger"
  | "text"
  | "link";
interface ButtonProps {
  full?: boolean;
  /**
   * @deprecated
   */
  type?: ButtonVariant;
  variant?: ButtonVariant;
  onClick?: (event: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => void;
  text?: string;
  title?: string;
}

export const Button = (props: ButtonProps) => {
  const { full, onClick, text, title } = props;
  const variant = props.variant || props.type || "default";

  return (
    <button
      className={`uk-button uk-button-${variant} uk-button-small ${
        full && "uk-width-1-1"
      }`}
      onClick={(e) => {
        if (onClick) {
          onClick(e);
        }
      }}
      title={title}
    >
      {text}
    </button>
  );
};

export default Button;
