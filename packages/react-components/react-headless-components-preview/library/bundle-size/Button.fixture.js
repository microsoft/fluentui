// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import {
  Button,
  ButtonContextProvider,
  renderButton,
  useButton,
  useButtonContext,
} from '@fluentui/react-headless-components-preview/button';

console.log(Button, ButtonContextProvider, renderButton, useButton, useButtonContext);

export default {
  name: '@fluentui/react-headless-components-preview/button',
};
