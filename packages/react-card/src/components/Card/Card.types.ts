import type { ComponentProps, ComponentState, IntrinsicSlotProps } from '@fluentui/react-utilities';

export type CardSlots = {
  root: IntrinsicSlotProps<'div'>;
};

/**
 * Card Props
 */
export type CardProps = ComponentProps<CardSlots>;

/**
 * State used in rendering Card
 */
export type CardState = ComponentState<CardSlots>;
