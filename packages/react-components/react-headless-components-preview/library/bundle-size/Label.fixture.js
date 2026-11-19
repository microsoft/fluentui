// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import { Label, renderLabel, useLabel } from '@fluentui/react-headless-components-preview/label';

console.log(Label, renderLabel, useLabel);

export default {
  name: '@fluentui/react-headless-components-preview/label',
};
