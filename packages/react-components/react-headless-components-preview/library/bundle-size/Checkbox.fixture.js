// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import { Checkbox, renderCheckbox, useCheckbox } from '@fluentui/react-headless-components-preview/checkbox';

console.log(Checkbox, renderCheckbox, useCheckbox);

export default {
  name: '@fluentui/react-headless-components-preview/checkbox',
};
