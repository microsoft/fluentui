import * as React from 'react';
import { DialogHost } from './DialogHost';
import { IButtonProps } from '../Button/Button.Props';
import { IWithResponsiveModeState } from '../../utilities/decorators/withResponsiveMode';
import { IAccessiblePopupProps } from '../../common/IAccessiblePopupProps';

export interface IDialog {

}

export interface IDialogHostProps extends React.Props<DialogHost>, IDialogHostInheritableProps { }

export interface IDialogHostInheritableProps extends IWithResponsiveModeState, IAccessiblePopupProps {
  /**
   * Optional callback to access the IDialog interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IDialog) => void;

  /**
  * Whether the dialog is displayed.
  * @default false
  */
  isOpen?: boolean;

  /**
  * Whether the overlay is dark themed.
  * @default true
  */
  isDarkOverlay?: boolean;

  /**
  * A callback function for when the DialogHost is dismissed light dismiss, before the animation completes.
  */
  onDismiss?: (ev?: React.MouseEvent<HTMLButtonElement>) => any;

  /**
   * A callback function which is called after the DialogHost is dismissed and the animation is complete.
   */
  onDismissed?: () => any;

  /**
  * Whether the dialog can be light dismissed by clicking outside the dialog (on the overlay).
  * @default false
  */
  isBlocking?: boolean;

  /**
   * Optional class name to be added to the root class
   */
  className?: string;

  /**
  * Optional override for container class
  */
  containerClassName?: string;

  /**
   * A callback function for when the DialogHost content is mounted on the overlay layer
   */
  onLayerDidMount?: () => void;

  /**
   * ARIA id for the title of the DialogHost, if any
   */
  titleAriaId?: string;

  /**
   * ARIA id for the subtitle of the DialogHost, if any
   */
  subtitleAriaId?: string;
}