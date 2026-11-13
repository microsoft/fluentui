// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import { Tag, renderTag, useTag, useTagContextValues } from '@fluentui/react-headless-components-preview/tag';

console.log(Tag, renderTag, useTag, useTagContextValues);

export default {
  name: '@fluentui/react-headless-components-preview/tag',
};
