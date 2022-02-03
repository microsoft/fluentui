import type { ComponentProps, ComponentState, IntrinsicSlotProps } from '@fluentui/react-utilities';

export type SpinnerSlots = {
  root: IntrinsicSlotProps<'div'>;
};

export type SpinnerCommonsUnstable = {
  // TODO Add things shared between props and state here
};

/**
 * Spinner Props
 */
export type SpinnerProps = ComponentProps<SpinnerSlots> & SpinnerCommonsUnstable;

/**
 * State used in rendering Spinner
 */
export type SpinnerState = ComponentState<SpinnerSlots> & SpinnerCommonsUnstable;
