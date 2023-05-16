import { component$ } from "@builder.io/qwik";
import { BlogLogo } from "../icons/blog";
import styles from "./header.module.css";
import SignButton from "~/components/signButton/signButton";

export default component$(() => {
  return (
    <header class={styles.header}>
      <div class={["container", styles.wrapper]}>
        <div class={styles.logo}>
          <a href="/" title="boburblog">
            <BlogLogo height={50} width={143} />
          </a>
        </div>
        <div class={styles.input}>
          <input type="text" name="search" autoComplete="off" />
        </div>
        <ul>
          <li>
            <SignButton name="Sign in" link="/" />
          </li>
          <li>
            <SignButton name="Sign up" link="/" />
          </li>
        </ul>
      </div>
    </header>
  );
});
