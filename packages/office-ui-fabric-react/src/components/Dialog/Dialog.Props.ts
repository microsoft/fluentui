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
  dialogContentProps?: IDialogContentProps;

  /**
  * A callback function for when the Dialog is dismissed from the close button or light dismiss. Can also be specified separately in content and modal.
  */
  onDismiss?: (ev?: React.MouseEvent<HTMLButtonElement>) => any;

  /**
  * Whether the dialog is hidden.
  * @default false
  */
  hidden?: boolean;

  /**
  * Props to be passed through to Modal
  */
  modalProps?: IModalProps;

  /**
  * Whether the dialog is displayed.
  * @default false
  * @deprecated Use hidden instead
  */
  isOpen?: boolean;

  /**
  * Whether the overlay is dark themed.
  * @default true
  * @deprecated Pass through via modalProps instead
  */
  isDarkOverlay?: boolean;

  /**
   * A callback function which is called after the Dialog is dismissed and the animation is complete.
   * @deprecated Pass through via modalProps instead
   */
  onDismissed?: () => any;

  /**
  * Whether the dialog can be light dismissed by clicking outside the dialog (on the overlay).
  * @default false
  * @deprecated Pass through via modalProps instead
  */
  isBlocking?: boolean;

  /**
   * Optional class name to be added to the root class
   * @deprecated Pass through via modalProps.className instead
   */
  className?: string;

  /**
  * Optional override for container class
  * @deprecated Pass through via modalProps.className instead
  */
  containerClassName?: string;

  /**
   * A callback function for when the Dialog content is mounted on the overlay layer
   * @deprecated Pass through via modalProps instead
   */
  onLayerDidMount?: () => void;

  /**
 * Deprecated at 0.81.2, use 'onLayerDidMount' instead.
 * @deprecated
 */
  onLayerMounted?: () => void;

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

  /**
  * Optional id for aria-LabelledBy
  * @deprecated Pass through via modalProps.titleAriaId instead
  */
  ariaLabelledById?: string;

  /**
  * Optional id for aria-DescribedBy
  * @deprecated Pass through via modalProps.subtitleAriaId instead
  */
  ariaDescribedById?: string;

}