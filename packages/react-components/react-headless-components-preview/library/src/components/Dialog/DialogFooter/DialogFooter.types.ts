import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type DialogFooterSlots = {
  root: Slot<'footer'>;
};

export type DialogFooterProps = ComponentProps<DialogFooterSlots>;

export type DialogFooterState = ComponentState<DialogFooterSlots>;
