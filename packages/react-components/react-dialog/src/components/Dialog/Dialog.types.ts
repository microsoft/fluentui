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
// TODO: Add union of props to pick from DialogProps once they're implemented.
// i.e. Required<Pick<DialogProps, 'property1' | 'property2'>>;
export type DialogState = ComponentState<DialogSlots>;
