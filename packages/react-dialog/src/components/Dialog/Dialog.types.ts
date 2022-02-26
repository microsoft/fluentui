import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type DialogSlots = {
  root: Slot<'div'>;
};

type DialogCommons = {
  // TODO Add things shared between props and state here
};

/**
 * Dialog Props
 */
export type DialogProps = ComponentProps<DialogSlots> & DialogCommons;

/**
 * State used in rendering Dialog
 */
export type DialogState = ComponentState<DialogSlots> & DialogCommons;
