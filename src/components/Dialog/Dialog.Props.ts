import * as React from 'react';
import Dialog from './Dialog';
import { IWithResponsiveModeState } from '../../utilities/decorators/withResponsiveMode';

export interface IDialogProps extends React.Props<Dialog>, IWithResponsiveModeState {
  /**
  * Whether the dialog is displayed.
  * @default false
  */
  isOpen?: boolean;

  /**
  * The type of Dialog to display.
  * @default DialogType.normal
  */
  type?: DialogType;

  /**
  * Whether the overlay is dark themed.
  * @default true
  */
  isDarkOverlay?: boolean;

  /**
  * A callback function for when the Dialog is dismissed from the close button or light dismiss.
  */
  onDismiss?: (ev?: React.MouseEvent) => any;

  /**
  * The title text to display at the top of the dialog.
  */
  title?: string;

  /**
  * The subtext to display in the dialog.
  */
  subText?: string;

  /**
  * Whether the dialog can be light dismissed by clicking outside the dialog (on the overlay).
  * @default false
  */
  isBlocking?: boolean;

  /**
  * Optional override class name
  */
  className?: string;
}

export enum DialogType {
  /** Standard dialog */
  normal,
  /** Dialog with large header banner */
  largeHeader,
  /** Dialog with an 'x' close button in the upper-right corner */
  close
}