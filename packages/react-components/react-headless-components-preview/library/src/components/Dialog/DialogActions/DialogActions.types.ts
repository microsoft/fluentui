import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type DialogActionsSlots = {
  root: Slot<'div'>;
};

export type DialogActionsProps = ComponentProps<DialogActionsSlots>;

export type DialogActionsState = ComponentState<DialogActionsSlots>;
