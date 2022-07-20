import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type DialogActionsSlots = {
  root: Slot<'div'>;
};

export type DialogActionsPosition = 'left' | 'right';

/**
 * DialogActions Props
 */
export type DialogActionsProps = ComponentProps<DialogActionsSlots> & {
  /**
   * defines the position on the dialog grid of the actions
   * @default 'right'
   */
  position?: DialogActionsPosition;
};

/**
 * State used in rendering DialogActions
 */
export type DialogActionsState = ComponentState<DialogActionsSlots> & {
  position: DialogActionsPosition;
};
