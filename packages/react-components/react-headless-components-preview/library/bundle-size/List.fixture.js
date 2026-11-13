// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import {
  List,
  ListItem,
  renderList,
  renderListItem,
  useList,
  useListContext,
  useListContextValues,
  useListItem,
} from '@fluentui/react-headless-components-preview/list';

console.log(List, ListItem, renderList, renderListItem, useList, useListContext, useListContextValues, useListItem);

export default {
  name: '@fluentui/react-headless-components-preview/list',
};
