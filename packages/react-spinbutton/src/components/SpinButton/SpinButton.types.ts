import type { ComponentProps, ComponentState, ComponentRender, Slot } from '@fluentui/react-utilities';

export type SpinButtonSlots = {
  root: Slot<'div'>;
};

export type SpinButtonCommons = {
  // TODO Add things shared between props and state here
};

/**
 * SpinButton Props
 */
export type SpinButtonProps = ComponentProps<SpinButtonSlots> & SpinButtonCommons;

/**
 * State used in rendering SpinButton
 */
export type SpinButtonState = ComponentState<SpinButtonSlots> & SpinButtonCommons;

export type SpinButtonRender = ComponentRender<SpinButtonState>;
