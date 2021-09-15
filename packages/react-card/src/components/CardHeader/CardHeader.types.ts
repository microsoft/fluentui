import type { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';

export type CardHeaderSlots = {
  root: IntrinsicShorthandProps<'div'>;
  image: IntrinsicShorthandProps<'div'>;
  content?: IntrinsicShorthandProps<'div'>;
  header: IntrinsicShorthandProps<'span'>;
  description: IntrinsicShorthandProps<'span'>;
  action?: IntrinsicShorthandProps<'div'>;
};

/**
 * CardHeader props
 */
export interface CardHeaderProps extends ComponentProps<CardHeaderSlots> {}

/**
 * State used in rendering CardHeader
 */
export interface CardHeaderState extends ComponentState<CardHeaderSlots> {}
