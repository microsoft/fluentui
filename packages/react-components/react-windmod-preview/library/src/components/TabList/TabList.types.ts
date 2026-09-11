import type {
  TabListProps as TabListHeadlessProps,
  TabListState as TabListHeadlessState,
} from '@fluentui/react-headless-components-preview/tab-list';

export type { TabListSlots, TabValue } from '@fluentui/react-headless-components-preview/tab-list';

/** Visual style of every Tab in a TabList. `'transparent'` is the base look. */
export type TabAppearance = 'transparent' | 'subtle' | 'subtle-circular' | 'filled-circular';

/** Size of every Tab in a TabList. `'medium'` is the base look. */
export type TabSize = 'small' | 'medium' | 'large';

/**
 * Windmod TabList props: the headless tab list plus the look props the headless surface
 * deliberately omits. All three reach each Tab through context, never as Tab props.
 */
export type TabListProps = TabListHeadlessProps & {
  /** @default 'transparent' */
  appearance?: TabAppearance;
  /**
   * Holds each unselected tab at the width it will have once selected.
   * @default true
   */
  reserveSelectedTabSpace?: boolean;
  /** @default 'medium' */
  size?: TabSize;
};

/** Windmod TabList state: headless state plus the resolved look props. */
export type TabListState = TabListHeadlessState &
  Required<Pick<TabListProps, 'appearance' | 'reserveSelectedTabSpace' | 'size'>>;
