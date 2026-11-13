// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import { toDataAttributeValue } from '@fluentui/react-headless-components-preview/utils';

console.log(toDataAttributeValue);

export default {
  name: '@fluentui/react-headless-components-preview/utils',
};
