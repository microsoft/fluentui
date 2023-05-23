import type { ComponentProps, NextComponentState, Slot } from '@fluentui/react-utilities';

export type DialogContentSlots = {
  root: NonNullable<Slot<'div'>>;
};

/**
 * DialogContent Props
 */
export type DialogContentProps = ComponentProps<DialogContentSlots>;

/**
 * State used in rendering DialogContent
 */
export type DialogContentState = NextComponentState<DialogContentSlots>;
