import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type DialogActionsSlots = {
  root: Slot<'div'>;
};

export type DialogActionsPosition = 'start' | 'end';

/**
 * DialogActions Props
 */
export type DialogActionsProps = ComponentProps<DialogActionsSlots> & {
  /**
   * defines the position on the dialog grid of the actions
   * @default 'end'
   */
  position?: DialogActionsPosition;
};

/**
 * State used in rendering DialogActions
 */
export type DialogActionsState = ComponentState<DialogActionsSlots> & {
  position: DialogActionsPosition;
};
