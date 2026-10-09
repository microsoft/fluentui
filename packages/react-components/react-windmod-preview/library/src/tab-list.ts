export { TabList, tabListClassNames, useTabListStyles } from './components/TabList';
export type { TabAppearance, TabListProps, TabListSlots, TabListState, TabSize, TabValue } from './components/TabList';

export { Tab, tabClassNames, useTabAnimatedIndicator, useTabStyles } from './components/Tab';
export type { TabProps, TabSlots, TabState } from './components/Tab';

/** Headless building blocks, re-exported for consumers composing their own TabList. */
export {
  renderTab,
  renderTabList,
  useTab,
  useTabList,
  useTabListContextValues,
} from '@fluentui/react-headless-components-preview/tab-list';
