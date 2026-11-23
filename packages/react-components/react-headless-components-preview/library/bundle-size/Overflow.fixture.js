// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import {
  DATA_OVERFLOWING,
  DATA_OVERFLOW_DIVIDER,
  DATA_OVERFLOW_ITEM,
  DATA_OVERFLOW_MENU,
  Overflow,
  OverflowDivider,
  OverflowItem,
  OverflowReorderObserver,
  renderOverflow,
  useIsOverflowGroupVisible,
  useIsOverflowItemVisible,
  useOverflow,
  useOverflowContext,
  useOverflowContextValues,
  useOverflowCount,
  useOverflowDivider,
  useOverflowItem,
  useOverflowMenu,
  useOverflowVisibility,
} from '@fluentui/react-headless-components-preview/overflow';

console.log(
  DATA_OVERFLOWING,
  DATA_OVERFLOW_DIVIDER,
  DATA_OVERFLOW_ITEM,
  DATA_OVERFLOW_MENU,
  Overflow,
  OverflowDivider,
  OverflowItem,
  OverflowReorderObserver,
  renderOverflow,
  useIsOverflowGroupVisible,
  useIsOverflowItemVisible,
  useOverflow,
  useOverflowContext,
  useOverflowContextValues,
  useOverflowCount,
  useOverflowDivider,
  useOverflowItem,
  useOverflowMenu,
  useOverflowVisibility,
);

export default {
  name: '@fluentui/react-headless-components-preview/overflow',
};
