import * as React from 'react';
import { IModalProps } from '../../Modal';
import { Dialog } from './Dialog';
import { DialogType, IDialogContentProps } from './DialogContent.Props';
import { IButtonProps } from '../Button/Button.Props';
import { IWithResponsiveModeState } from '../../utilities/decorators/withResponsiveMode';
import { IAccessiblePopupProps } from '../../common/IAccessiblePopupProps';

export interface IDialog {

}

export interface IDialogProps extends React.Props<Dialog>, IWithResponsiveModeState, IAccessiblePopupProps {

  /**
   * Optional callback to access the IDialog interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IDialog) => void;

  /**
  * Props to be passed through to Dialog Content
  */
  contentProps?: IDialogContentProps;

  /**
  * Props to be passed through to Modal
  */
  modalProps?: IModalProps;

  /**
  * A callback function for when the Dialog is dismissed from the close button or light dismiss. Can also be specified separately in content and modal.
  */
  onDismiss?: (ev?: React.MouseEvent<HTMLButtonElement>) => any;

  /**
  * Whether the dialog is displayed.
  * @default false
  * @deprecated Pass through via dialogModalProps instead
  */
  isOpen?: boolean;

  /**
  * Whether the overlay is dark themed.
  * @default true
  * @deprecated Pass through via dialogModalProps instead
  */
  isDarkOverlay?: boolean;

  /**
   * A callback function which is called after the Dialog is dismissed and the animation is complete.
   * @deprecated Pass through via dialogModalProps instead
   */
  onDismissed?: () => any;

  /**
  * Whether the dialog can be light dismissed by clicking outside the dialog (on the overlay).
  * @default false
  * @deprecated Pass through via dialogModalProps instead
  */
  isBlocking?: boolean;

  /**
   * Optional class name to be added to the root class
   * @deprecated Pass through via dialogModalProps instead
   */
  className?: string;

  /**
  * Optional override for container class
  * @deprecated Pass through via dialogModalProps instead
  */
  containerClassName?: string;

  /**
   * A callback function for when the Dialog content is mounted on the overlay layer
   * @deprecated Pass through via dialogModalProps instead
   */
  onLayerDidMount?: () => void;

  /**
  * The type of Dialog to display.
  * @default DialogType.normal
  * @deprecated Pass through via dialogContentProps instead
  */
  type?: DialogType;

  /**
  * The title text to display at the top of the dialog.
  * @deprecated Pass through via dialogContentProps instead
  */
  title?: string;

  /**
  * The subtext to display in the dialog.
  * @deprecated Pass through via dialogContentProps instead
  */
  subText?: string;

  /**
  * Optional override content class
  * @deprecated Pass through via dialogContentProps instead as className
  */
  contentClassName?: string;

  /**
   * Other top buttons that will show up next to the close button
   * @deprecated Pass through via dialogContentProps instead
   */
  topButtonsProps?: IButtonProps[];

}