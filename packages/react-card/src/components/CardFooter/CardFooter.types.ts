import type { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';

export type CardFooterSlots = {
  root: IntrinsicShorthandProps<'div'>;
  action?: IntrinsicShorthandProps<'div'>;
};

/**
 * CardFooter props
 */
export interface CardFooterProps extends ComponentProps<CardFooterSlots> {}

/**
 * State used in rendering CardFooter
 */
export interface CardFooterState extends ComponentState<CardFooterSlots> {}
