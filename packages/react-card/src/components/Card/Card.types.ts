import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type CardSlots = {
  root: Slot<'div'>;
};

/**
 * Card Props
 */
export type CardProps = ComponentProps<CardSlots>;

/**
 * State used in rendering Card
 */
export type CardState = ComponentState<CardSlots>;
