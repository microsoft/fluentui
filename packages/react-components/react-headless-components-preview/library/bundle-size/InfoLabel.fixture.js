// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import {
  InfoButton,
  InfoLabel,
  renderInfoButton,
  renderInfoLabel,
  useInfoButton,
  useInfoLabel,
} from '@fluentui/react-headless-components-preview/info-label';

console.log(InfoButton, InfoLabel, renderInfoButton, renderInfoLabel, useInfoButton, useInfoLabel);

export default {
  name: '@fluentui/react-headless-components-preview/info-label',
};
