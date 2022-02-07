import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type SpinButtonSlots = {
  root: Slot<'div'>;
};

export type SpinButtonCommonsUnstable = {
  // TODO Add things shared between props and state here
};

/**
 * SpinButton Props
 */
export type SpinButtonProps = ComponentProps<SpinButtonSlots> & SpinButtonCommonsUnstable;

/**
 * State used in rendering SpinButton
 */
export type SpinButtonState = ComponentState<SpinButtonSlots> & SpinButtonCommonsUnstable;
