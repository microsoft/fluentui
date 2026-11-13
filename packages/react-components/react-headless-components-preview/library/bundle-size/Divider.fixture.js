// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import { Divider, renderDivider, useDivider } from '@fluentui/react-headless-components-preview/divider';

console.log(Divider, renderDivider, useDivider);

export default {
  name: '@fluentui/react-headless-components-preview/divider',
};
