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
 * CardFooter base props (same as CardFooterProps since CardFooter has no design props)
 */
export type CardFooterBaseProps = CardFooterProps;

/**
 * State used in rendering CardFooter.
 */
export type CardFooterState = ComponentState<CardFooterSlots>;

/**
 * CardFooter base state (same as CardFooterState since CardFooter has no design props)
 */
export type CardFooterBaseState = CardFooterState;
