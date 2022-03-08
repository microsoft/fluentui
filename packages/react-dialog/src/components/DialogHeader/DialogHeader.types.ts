import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type DialogHeaderSlots = {
  root: Slot<'div'>;
};

type DialogHeaderCommons = {
  // TODO Add things shared between props and state here
};

/**
 * DialogHeader Props
 */
export type DialogHeaderProps = ComponentProps<DialogHeaderSlots> & DialogHeaderCommons;

/**
 * State used in rendering DialogHeader
 */
export type DialogHeaderState = ComponentState<DialogHeaderSlots> & DialogHeaderCommons;
