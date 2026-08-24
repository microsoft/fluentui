export { TabList, tabListClassNames, useTabListStyles } from './components/TabList';
export type { TabAppearance, TabListProps, TabListSlots, TabListState, TabSize, TabValue } from './components/TabList';

/** Headless building blocks, re-exported for consumers composing their own TabList. */
export {
  renderTabList,
  useTabList,
  useTabListContextValues,
} from '@fluentui/react-headless-components-preview/tab-list';
