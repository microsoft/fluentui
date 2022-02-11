import type { ComponentProps, ComponentState, ComponentRender, Slot } from '@fluentui/react-utilities';

export type DialogSlots = {
  root: Slot<'div'>;
};

export type DialogCommons = {
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

export type DialogRender = ComponentRender<DialogState>;
