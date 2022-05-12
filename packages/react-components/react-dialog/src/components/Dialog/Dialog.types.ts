import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type DialogSlots = {
  root: Slot<'div'>;
};

/**
 * Dialog Props
 */
export type DialogProps = ComponentProps<DialogSlots>;

/**
 * State used in rendering Dialog
 */
// TODO: Replace never below with union of props to pick from DialogProps above.
export type DialogState = ComponentState<DialogSlots> & Required<Pick<DialogProps, never>>;
