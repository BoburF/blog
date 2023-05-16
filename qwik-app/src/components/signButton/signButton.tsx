import { component$, useStylesScoped$ } from "@builder.io/qwik";
import STYLES from "./index.css?inline";

export default component$(({ name, link }: { name: string; link: string }) => {
  useStylesScoped$(STYLES);
  return (
    <a href={link}>
      <button>{name}</button>
    </a>
  );
});
