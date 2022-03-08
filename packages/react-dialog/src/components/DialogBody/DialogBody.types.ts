import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type DialogBodySlots = {
  root: Slot<'div'>;
};

type DialogBodyCommons = {
  // TODO Add things shared between props and state here
};

/**
 * DialogBody Props
 */
export type DialogBodyProps = ComponentProps<DialogBodySlots> & DialogBodyCommons;

/**
 * State used in rendering DialogBody
 */
export type DialogBodyState = ComponentState<DialogBodySlots> & DialogBodyCommons;
