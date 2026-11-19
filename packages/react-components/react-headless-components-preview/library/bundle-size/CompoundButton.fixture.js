// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import {
  CompoundButton,
  renderCompoundButton,
  useCompoundButton,
} from '@fluentui/react-headless-components-preview/compound-button';

console.log(CompoundButton, renderCompoundButton, useCompoundButton);

export default {
  name: '@fluentui/react-headless-components-preview/compound-button',
};
