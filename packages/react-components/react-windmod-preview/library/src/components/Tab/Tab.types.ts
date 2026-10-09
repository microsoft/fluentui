import type { ComponentState, Slot } from '@fluentui/react-utilities';
import type {
  TabProps as TabHeadlessProps,
  TabSlots,
  TabState as TabHeadlessState,
} from '@fluentui/react-headless-components-preview/tab-list';

import type { TabListProps } from '../TabList/TabList.types';

export type { TabSlots, TabValue } from '@fluentui/react-headless-components-preview/tab-list';

/** Windmod Tab props: the headless surface unchanged — appearance and size come from the list. */
export type TabProps = TabHeadlessProps;

/** The reserved-space slot is internal: it is derived from the content slot, never supplied. */
type TabInternalSlots = TabSlots & { contentReservedSpace?: Slot<'span'> };

/** Windmod Tab state: headless state plus the list's look values and the reserved-space slot. */
export type TabState = TabHeadlessState &
  Required<Pick<TabListProps, 'appearance' | 'size'>> &
  Pick<ComponentState<TabInternalSlots>, 'contentReservedSpace'>;
