// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import { Select, renderSelect, useSelect } from '@fluentui/react-headless-components-preview/select';

console.log(Select, renderSelect, useSelect);

export default {
  name: '@fluentui/react-headless-components-preview/select',
};
