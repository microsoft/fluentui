import type { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';

export type SpinButtonSlots = {
  // TODO Add slots here and to spinButtonShorthandProps in useSpinButton.ts
  root: IntrinsicShorthandProps<'div'>;
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
