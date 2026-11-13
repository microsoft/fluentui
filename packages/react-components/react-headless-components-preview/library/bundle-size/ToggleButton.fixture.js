// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import {
  ToggleButton,
  renderToggleButton,
  useToggleButton,
} from '@fluentui/react-headless-components-preview/toggle-button';

console.log(ToggleButton, renderToggleButton, useToggleButton);

export default {
  name: '@fluentui/react-headless-components-preview/toggle-button',
};
