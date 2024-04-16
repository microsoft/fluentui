import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

/**
 * Slots available in the CardFooter component.
 */
export type CardFooterSlots = {
  /**
   * Root element of the component.
   */
  root: Slot<'div'>;

  /**
   * Container that renders on the far end of the footer, used for action buttons.
   */
  action?: Slot<'div'>;
};

/**
 * CardFooter component props.
 */
export type CardFooterProps = ComponentProps<CardFooterSlots>;

/**
 * State used in rendering CardFooter.
 */
export type CardFooterState = ComponentState<CardFooterSlots>;
