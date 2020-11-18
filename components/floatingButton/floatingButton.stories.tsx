import { storiesOf } from "@storybook/react";
import FloatingButton from "./floatingButton";

storiesOf("FloatingButton", module).add("with text", () => {
  return <FloatingButton text="Hello World"/>;
});

storiesOf("Button", module).add("with emoji", () => {
  return <FloatingButton text="😀 😎 👍 💯" />;
});