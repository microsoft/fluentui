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
export type CardHeaderProps = ComponentProps<CardHeaderSlots>;

/**
 * State used in rendering CardHeader
 */
export type CardHeaderState = ComponentState<CardHeaderSlots>;
