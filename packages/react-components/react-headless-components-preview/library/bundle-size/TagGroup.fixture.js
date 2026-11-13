// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import {
  TagGroup,
  renderTagGroup,
  useTagGroup,
  useTagGroupContext,
  useTagGroupContextValues,
} from '@fluentui/react-headless-components-preview/tag-group';

console.log(TagGroup, renderTagGroup, useTagGroup, useTagGroupContext, useTagGroupContextValues);

export default {
  name: '@fluentui/react-headless-components-preview/tag-group',
};
