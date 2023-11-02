import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TeachingBubbleTitleSlots = {
  /**
   * Title for teaching bubble
   */
  root: Slot<'div', 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>;
  /**
   * An alternate close button path if not placed in the TeachingBubbleHeader
   */
  dismissButton?: Slot<'button'>;
};

/**
 * TeachingBubbleTitle Props
 */
export type TeachingBubbleTitleProps = ComponentProps<TeachingBubbleTitleSlots> & {
  showDismiss?: boolean;
};

/**
 * State used in rendering TeachingBubbleTitle
 */
export type TeachingBubbleTitleState = ComponentState<TeachingBubbleTitleSlots> &
  Pick<TeachingBubbleTitleProps, 'showDismiss'>;
