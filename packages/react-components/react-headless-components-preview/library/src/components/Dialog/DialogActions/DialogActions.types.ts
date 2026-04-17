import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type DialogActionsSlots = {
  root: Slot<'footer'>;
};

export type DialogActionsProps = ComponentProps<DialogActionsSlots>;

export type DialogActionsState = ComponentState<DialogActionsSlots>;
