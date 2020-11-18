import { storiesOf } from "@storybook/react";
import SearchInput from "./searchInput";

const searchInputProps = {
    placeholder: "search achievements",
    query: 'query',
    handleSearch: () => console.log('xx'),
  };

storiesOf("SearchInput", module).add("with text", () => {
  return <SearchInput {...searchInputProps}/>;
});

storiesOf("Button", module).add("with emoji", () => {
  return <SearchInput {...searchInputProps}/>;
});


