import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type CardSlots = {
  root: Slot<'div'>;
};

export type CardCommons = {
  appearance: 'filled' | 'filled-alternative' | 'outline' | 'subtle';
};

/**
 * Card Props
 */
export type CardProps = ComponentProps<CardSlots> & Partial<CardCommons>;

/**
 * State used in rendering Card
 */
export type CardState = ComponentState<CardSlots> & CardCommons;
