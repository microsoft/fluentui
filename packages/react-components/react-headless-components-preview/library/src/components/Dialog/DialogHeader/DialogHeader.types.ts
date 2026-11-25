import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type DialogHeaderSlots = {
  root: Slot<'header'>;
};

export type DialogHeaderProps = ComponentProps<DialogHeaderSlots>;

export type DialogHeaderState = ComponentState<DialogHeaderSlots>;
