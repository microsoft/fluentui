// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import { Input, renderInput, useInput } from '@fluentui/react-headless-components-preview/input';

console.log(Input, renderInput, useInput);

export default {
  name: '@fluentui/react-headless-components-preview/input',
};
