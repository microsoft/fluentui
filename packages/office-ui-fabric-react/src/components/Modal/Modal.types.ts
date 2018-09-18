import * as React from 'react';
import { ModalBase } from './Modal.base';
import { IWithResponsiveModeState } from '../../utilities/decorators/withResponsiveMode';
import { IAccessiblePopupProps } from '../../common/IAccessiblePopupProps';
import { IStyle, ITheme } from '../../Styling';
import { IRefObject, IStyleFunctionOrObject } from '../../Utilities';

export interface IModal {
  /**
   * Sets focus on the first focusable, or configured, child in focus trap zone
   */
  focus: () => void;
}

export interface IModalProps extends React.Props<ModalBase>, IWithResponsiveModeState, IAccessiblePopupProps {
  /**
   * Optional callback to access the IDialog interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IModal>;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IModalStyleProps, IModalStyles>;

  /**
   * Theme provided by High-Order Component.
   */
  theme?: ITheme;

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
   * Optional override for scrollable content class
   */
  scrollableContentClassName?: string;

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

export type IModalStyleProps = Required<Pick<IModalProps, 'theme'>> &
  Pick<IModalProps, 'className' | 'containerClassName' | 'scrollableContentClassName'> & {
    /** Modal open state. */
    isOpen?: boolean;
    /** Modal visible state. */
    isVisible?: boolean;
  };

export interface IModalStyles {
  root: IStyle;
  main: IStyle;
  scrollableContent: IStyle;
}
