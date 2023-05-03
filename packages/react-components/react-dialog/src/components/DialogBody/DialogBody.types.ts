import type { ComponentProps, NextComponentState, Slot } from '@fluentui/react-utilities';

export type DialogBodySlots = {
  root: NonNullable<Slot<'div'>>;
};

/**
 * DialogBody Props
 */
export type DialogBodyProps = ComponentProps<DialogBodySlots> & {};

/**
 * State used in rendering DialogBody
 */
export type DialogBodyState = NextComponentState<DialogBodySlots>;
