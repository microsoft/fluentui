// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import {
  Tab,
  TabList,
  renderTab,
  renderTabList,
  useTab,
  useTabList,
  useTabListContext,
  useTabListContextValues,
} from '@fluentui/react-headless-components-preview/tab-list';

console.log(Tab, TabList, renderTab, renderTabList, useTab, useTabList, useTabListContext, useTabListContextValues);

export default {
  name: '@fluentui/react-headless-components-preview/tab-list',
};
