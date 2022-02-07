import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type DialogSlots = {
  root: Slot<'div'>;
};

export type DialogCommonsUnstable = {
  // TODO Add things shared between props and state here
};

/**
 * Dialog Props
 */
export type DialogProps = ComponentProps<DialogSlots> & DialogCommonsUnstable;

/**
 * State used in rendering Dialog
 */
export type DialogState = ComponentState<DialogSlots> & DialogCommonsUnstable;
