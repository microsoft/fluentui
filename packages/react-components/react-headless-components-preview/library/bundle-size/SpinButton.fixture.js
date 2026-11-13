// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import { SpinButton, renderSpinButton, useSpinButton } from '@fluentui/react-headless-components-preview/spin-button';

console.log(SpinButton, renderSpinButton, useSpinButton);

export default {
  name: '@fluentui/react-headless-components-preview/spin-button',
};
