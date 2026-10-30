import type { useIsOverflowGroupVisible } from '@fluentui/react-overflow';

export type {
  OverflowProps,
  OnOverflowChangeData,
  OverflowItemProps,
  OverflowDividerProps,
  OverflowState,
  OverflowComponentState,
  OverflowContextValue,
  OverflowContextValues,
} from '@fluentui/react-overflow';

/**
 * Visibility of an overflow group, as returned by `useIsOverflowGroupVisible`.
 */
export type OverflowGroupState = ReturnType<typeof useIsOverflowGroupVisible>;
