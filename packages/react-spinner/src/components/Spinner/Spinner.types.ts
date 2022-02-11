import type { ComponentProps, ComponentState, ComponentRender, Slot } from '@fluentui/react-utilities';

export type SpinnerSlots = {
  root: Slot<'div'>;
};

type SpinnerCommons = {
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

export type SpinnerRender = ComponentRender<SpinnerState>;
