import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { TeachingPopoverAppearance } from '../TeachingPopover/TeachingPopover.types';

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
export type TeachingPopoverTitleProps = ComponentProps<TeachingPopoverTitleSlots> & {
  showDismiss?: boolean;
};

/**
 * State used in rendering TeachingPopoverTitle
 */
export type TeachingPopoverTitleState = ComponentState<TeachingPopoverTitleSlots> &
  Pick<TeachingPopoverTitleProps, 'showDismiss'> & {
    /**
     * Enables branded appearance state.
     */
    appearance: TeachingPopoverAppearance;
  };
