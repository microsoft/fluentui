import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type DialogContentSlots = {
  root: Slot<'div'>;
};

/**
 * DialogContent Props
 */
export type DialogContentProps = ComponentProps<DialogContentSlots>;

/**
 * State used in rendering DialogContent
 */
export type DialogContentState = ComponentState<DialogContentSlots>;
