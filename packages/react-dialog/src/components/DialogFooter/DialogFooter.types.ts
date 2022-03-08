import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type DialogFooterSlots = {
  root: Slot<'div'>;
};

type DialogFooterCommons = {
  // TODO Add things shared between props and state here
};

/**
 * DialogFooter Props
 */
export type DialogFooterProps = ComponentProps<DialogFooterSlots> & DialogFooterCommons;

/**
 * State used in rendering DialogFooter
 */
export type DialogFooterState = ComponentState<DialogFooterSlots> & DialogFooterCommons;
