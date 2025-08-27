import css from "./ErrorMessageComponent.module.css";

export default function ErrorMessageComponent() {
  
  return (
    <p className={css.text}>
      There was an error, please try again...
    </p>
  );
}
