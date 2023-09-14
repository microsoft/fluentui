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

  /**
   * Makes the actions expand the entire width of the DialogBody
   * @default false
   */
  fluid?: boolean;
};

/**
 * State used in rendering DialogActions
 */
export type DialogActionsState = ComponentState<DialogActionsSlots> &
  Pick<Required<DialogActionsProps>, 'position' | 'fluid'>;
