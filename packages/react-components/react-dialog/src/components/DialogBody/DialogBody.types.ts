import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type DialogBodySlots = {
  root: NonNullable<Slot<'div'>>;
};

/**
 * DialogBody Props
 */
export type DialogBodyProps = ComponentProps<Partial<DialogBodySlots>> & {};

/**
 * State used in rendering DialogBody
 */
export type DialogBodyState = ComponentState<DialogBodySlots>;
