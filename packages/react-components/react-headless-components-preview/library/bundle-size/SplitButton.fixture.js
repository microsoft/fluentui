// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import {
  SplitButton,
  renderSplitButton,
  useSplitButton,
} from '@fluentui/react-headless-components-preview/split-button';

console.log(SplitButton, renderSplitButton, useSplitButton);

export default {
  name: '@fluentui/react-headless-components-preview/split-button',
};
