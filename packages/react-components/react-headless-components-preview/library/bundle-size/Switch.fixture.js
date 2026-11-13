// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import { Switch, renderSwitch, useSwitch } from '@fluentui/react-headless-components-preview/switch';

console.log(Switch, renderSwitch, useSwitch);

export default {
  name: '@fluentui/react-headless-components-preview/switch',
};
