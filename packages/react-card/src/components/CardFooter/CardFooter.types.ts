import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type CardFooterSlots = {
  root: NonNullable<Slot<'div'>>;
  action?: Slot<'div'>;
};

/**
 * CardFooter props
 */
export type CardFooterProps = ComponentProps<CardFooterSlots>;

/**
 * State used in rendering CardFooter
 */
export type CardFooterState = ComponentState<CardFooterSlots>;
