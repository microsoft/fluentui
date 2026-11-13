// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import {
  ProgressBar,
  renderProgressBar,
  useProgressBar,
} from '@fluentui/react-headless-components-preview/progress-bar';

console.log(ProgressBar, renderProgressBar, useProgressBar);

export default {
  name: '@fluentui/react-headless-components-preview/progress-bar',
};
