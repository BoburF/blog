import { component$, useStylesScoped$ } from "@builder.io/qwik";
import STYLES from "./index.css?inline";

export default component$(() => {
  useStylesScoped$(STYLES);
  return (
    <>
      <div class="container">
        <div class="center">
          <h1>404</h1>
          <h2>
            <a href="/">Home</a>
          </h2>
        </div>
      </div>
    </>
  );
});
