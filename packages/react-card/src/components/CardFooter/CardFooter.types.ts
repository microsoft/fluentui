import type { ComponentProps, ComponentState, IntrinsicSlotProps } from '@fluentui/react-utilities';

export type CardFooterSlots = {
  root: IntrinsicSlotProps<'div'>;
  action?: IntrinsicSlotProps<'div'>;
};

/**
 * CardFooter props
 */
export type CardFooterProps = ComponentProps<CardFooterSlots>;

/**
 * State used in rendering CardFooter
 */
export type CardFooterState = ComponentState<CardFooterSlots>;
