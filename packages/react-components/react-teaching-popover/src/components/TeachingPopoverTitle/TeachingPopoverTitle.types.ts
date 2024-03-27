import { PopoverContextValue } from '@fluentui/react-popover';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TeachingPopoverTitleSlots = {
  /**
   * Title for teaching bubble
   */
  root: Slot<'h2', 'h1' | 'h3' | 'h4' | 'h5' | 'h6' | 'div'>;
  /**
   * An alternate close button path if not placed in the TeachingPopoverHeader
   */
  dismissButton?: Slot<'button'>;
};

/**
 * TeachingPopoverTitle Props
 */
export type TeachingPopoverTitleProps = ComponentProps<TeachingPopoverTitleSlots>;

/**
 * State used in rendering TeachingPopoverTitle
 */
export type TeachingPopoverTitleState = ComponentState<TeachingPopoverTitleSlots> &
  Pick<PopoverContextValue, 'appearance'>;
