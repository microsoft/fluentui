import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type SpinnerSlots = {
  root: Slot<'div'>;
};

export type SpinnerCommons = {
  // TODO Add things shared between props and state here
};

/**
 * Spinner Props
 */
export type SpinnerProps = ComponentProps<SpinnerSlots> & SpinnerCommons;

/**
 * State used in rendering Spinner
 */
export type SpinnerState = ComponentState<SpinnerSlots> & SpinnerCommons;
