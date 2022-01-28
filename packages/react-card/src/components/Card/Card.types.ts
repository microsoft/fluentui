import type { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';

export type CardSlots = {
  root: IntrinsicShorthandProps<'div'>;
};

/**
 * Card Props
 */
export type CardProps = ComponentProps<CardSlots>;

/**
 * State used in rendering Card
 */
export type CardState = ComponentState<CardSlots>;
