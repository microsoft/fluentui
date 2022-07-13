import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type DialogBodySlots = {
  root: Slot<'div'>;
};

/**
 * DialogBody Props
 */
export type DialogBodyProps = ComponentProps<DialogBodySlots> & {};

/**
 * State used in rendering DialogBody
 */
export type DialogBodyState = ComponentState<DialogBodySlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from DialogBodyProps.
// & Required<Pick<DialogBodyProps, 'propName'>>
