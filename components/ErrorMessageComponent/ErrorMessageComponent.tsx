import css from "./ErrorMessageComponent.module.css";



interface ErrorMessageComponentProps {
  message?: string;
  className?: string;
}

export default function ErrorMessageComponent({ message, className }: ErrorMessageComponentProps) {
  if (!message) return null; 
  return <p className={`${css.text} ${className ?? ""}`}>{message}</p>;
}