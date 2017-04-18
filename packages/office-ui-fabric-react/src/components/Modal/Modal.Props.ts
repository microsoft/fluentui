import * as React from 'react';
import { Modal } from './Modal';
import { IWithResponsiveModeState } from '../../utilities/decorators/withResponsiveMode';
import { IAccessiblePopupProps } from '../../common/IAccessiblePopupProps';

export interface IModal {

}

export interface IModalProps extends React.Props<Modal>, IWithResponsiveModeState, IAccessiblePopupProps {
  /**
   * Optional callback to access the IDialog interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IModal) => void;

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
  * A callback function for when the Modal is dismissed light dismiss, before the animation completes.
  */
  onDismiss?: (ev?: React.MouseEvent<HTMLButtonElement>) => any;

  /**
   * A callback function which is called after the Modal is dismissed and the animation is complete.
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
   * A callback function for when the Modal content is mounted on the overlay layer
   */
  onLayerDidMount?: () => void;

  /**
   * ARIA id for the title of the Modal, if any
   */
  titleAriaId?: string;

  /**
   * ARIA id for the subtitle of the Modal, if any
   */
  subtitleAriaId?: string;
}