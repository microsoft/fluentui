import * as React from 'react';
import { DialogContent } from './DialogContent';
import { IButtonProps } from '../Button/Button.Props';
import { ResponsiveMode } from '../../utilities/decorators/withResponsiveMode';

export interface IDialogContent {

}

export interface IDialogContentProps extends React.Props<DialogContent> {
  /**
  * Optional callback to access the IDialogContent interface. Use this instead of ref for accessing
  * the public methods and properties of the component.
  */
  componentRef?: (component: IDialogContent) => void;

  /**
  * Show an 'x' close button in the upper-right corner
  */
  showCloseButton?: boolean;

  /**
   * Other top buttons that will show up next to the close button
   */
  topButtonsProps?: IButtonProps[];

  /**
  * Optional override class name
  */
  className?: string;

  /**
  * A callback function for when the Dialog is dismissed from the close button or light dismiss, before the animation completes.
  */
  onDismiss?: (ev?: React.MouseEvent<HTMLButtonElement>) => any;

  /**
  * The Id for subText container
  */
  subTextId?: string;

  /**
  * The subtext to display in the dialog
  */
  subText?: string;

  /**
   * The Id for title container
   */
  titleId?: string;

  /**
  * The title text to display at the top of the dialog.
  */
  title?: string;

  /**
   * Responsive mode passed in from decorator.
   */
  responsiveMode?: ResponsiveMode;

  /**
   * Label to be passed to to aria-label of close button
   * @default Close
   */
  closeButtonAriaLabel?: string;

  /**
  * The type of Dialog to display.
  * @default DialogType.normal
  */
  type?: DialogType;
}

export enum DialogType {
  /** Standard dialog */
  normal = 0,
  /** Dialog with large header banner */
  largeHeader = 1,
  /** Dialog with an 'x' close button in the upper-right corner */
  close = 2
}
