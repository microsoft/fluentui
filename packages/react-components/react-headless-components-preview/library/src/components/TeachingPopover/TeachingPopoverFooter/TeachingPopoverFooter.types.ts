import type { Slot } from '@fluentui/react-utilities';

export type {
  TeachingPopoverFooterBaseProps as TeachingPopoverFooterProps,
  TeachingPopoverFooterBaseState as TeachingPopoverFooterState,
} from '@fluentui/react-teaching-popover';

export type TeachingPopoverFooterSlots = {
  /**
   * The element wrapping the buttons.
   */
  root: NonNullable<Slot<'div'>>;
};
