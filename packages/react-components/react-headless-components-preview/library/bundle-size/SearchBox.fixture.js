// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import { SearchBox, renderSearchBox, useSearchBox } from '@fluentui/react-headless-components-preview/search-box';

console.log(SearchBox, renderSearchBox, useSearchBox);

export default {
  name: '@fluentui/react-headless-components-preview/search-box',
};
