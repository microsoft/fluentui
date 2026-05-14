import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type DialogBodySlots = {
  root: Slot<'div'>;
};

export type DialogBodyProps = ComponentProps<DialogBodySlots>;

export type DialogBodyState = ComponentState<DialogBodySlots>;
