import type {
  DialogActionsProps as DialogActionsBaseProps,
  DialogActionsState as DialogActionsBaseState,
} from '@fluentui/react-headless-components-preview/dialog';
export type { DialogActionsSlots } from '@fluentui/react-headless-components-preview/dialog';

export type DialogActionsPosition = 'start' | 'end';

export type DialogActionsProps = DialogActionsBaseProps & {
  /**
   * Defines the position of the actions in the dialog grid.
   *
   * @default 'end'
   */
  position?: DialogActionsPosition;

  /**
   * Makes the actions expand across the entire width of the DialogSurface.
   *
   * @default false
   */
  fluid?: boolean;
};

export type DialogActionsState = DialogActionsBaseState & {
  position: NonNullable<DialogActionsProps['position']>;
  fluid: NonNullable<DialogActionsProps['fluid']>;
  root: DialogActionsBaseState['root'] & {
    'data-fluid'?: '';
    'data-position': NonNullable<DialogActionsProps['position']>;
  };
};
