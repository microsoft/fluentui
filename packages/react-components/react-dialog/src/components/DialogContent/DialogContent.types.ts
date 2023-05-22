import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type DialogContentSlots = {
  root: NonNullable<Slot<'div'>>;
};

/**
 * DialogContent Props
 */
export type DialogContentProps = ComponentProps<Partial<DialogContentSlots>>;

/**
 * State used in rendering DialogContent
 */
export type DialogContentState = ComponentState<DialogContentSlots>;
