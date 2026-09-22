import type { PresenceMotionSlotProps } from '@fluentui/react-motion';
import type { ComponentState, Slot } from '@fluentui/react-utilities';
import type {
  NavSubItemGroupProps as NavSubItemGroupBaseProps,
  NavSubItemGroupSlots as NavSubItemGroupBaseSlots,
  NavSubItemGroupState as NavSubItemGroupBaseState,
} from '@fluentui/react-headless-components-preview/nav';

export type NavSubItemGroupSlots = NavSubItemGroupBaseSlots & {
  collapseMotion?: Slot<PresenceMotionSlotProps>;
};

export type NavSubItemGroupProps = NavSubItemGroupBaseProps & Partial<Pick<NavSubItemGroupSlots, 'collapseMotion'>>;

export type NavSubItemGroupState = Omit<NavSubItemGroupBaseState, 'components'> & ComponentState<NavSubItemGroupSlots>;
