import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type AlertSlots = {
  root: Slot<'div'>;
};

type AlertCommons = {
  // TODO Add things shared between props and state here
};

/**
 * Alert Props
 */
export type AlertProps = ComponentProps<AlertSlots> & AlertCommons;

/**
 * State used in rendering Alert
 */
export type AlertState = ComponentState<AlertSlots> & AlertCommons;
