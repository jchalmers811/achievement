import { storiesOf } from "@storybook/react";
import FloatingButton from "./floatingButton";

storiesOf("FloatingButton", module).add("with text", () => {
  return <FloatingButton text='meow'></FloatingButton>
});

storiesOf("FloatingButton", module).add("with emoji", () => {
  return <FloatingButton text='woof'></FloatingButton>
});

