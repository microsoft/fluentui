import * as React from 'react';
import { ModalBase } from './Modal.base';
import { IWithResponsiveModeState } from '../../utilities/decorators/withResponsiveMode';
import { IAccessiblePopupProps } from '../../common/IAccessiblePopupProps';
import { IStyle, ITheme } from '../../Styling';
import { ILayerProps } from '../../Layer';
import { IRefObject, IStyleFunctionOrObject } from '../../Utilities';

export interface IModal {
  /**
   * Sets focus on the first focusable, or configured, child in focus trap zone
   */
  focus: () => void;
}

export interface IModalProps extends React.ClassAttributes<ModalBase>, IWithResponsiveModeState, IAccessiblePopupProps {
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
   * @defaultvalue false
   */
  isOpen?: boolean;

  /**
   * Whether the overlay is dark themed.
   * @defaultvalue true
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
   * Props to be passed through to Layer
   */
  layerProps?: ILayerProps;

  /**
   * Whether the dialog can be light dismissed by clicking outside the dialog (on the overlay).
   * @defaultvalue false
   */
  isBlocking?: boolean;

  /**
   * Whether the dialog should be modeless (e.g. not dismiss when focusing/clicking outside of the dialog).
   * if true: isBlocking is ignored, there will be no overlay (isDarkOverlay is ignored),
   * isClickableOutsideFocusTrap is true, and forceFocusInsideTrap is false
   */
  isModeless?: boolean;

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
   * @deprecated Use layerProps.onLayerDidMount instead
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

  /**
   * Whether the modal should have top offset fixed once opened and expand from the bottom only
   * when the content changes dynamically.
   */
  topOffsetFixed?: boolean;
}

export type IModalStyleProps = Required<Pick<IModalProps, 'theme'>> &
  Pick<IModalProps, 'className' | 'containerClassName' | 'scrollableContentClassName' | 'topOffsetFixed' | 'isModeless'> & {
    /** Modal open state. */
    isOpen?: boolean;
    /** Modal visible state. */
    isVisible?: boolean;
    /** Modal has been opened state. */
    hasBeenOpened?: boolean;
    /** Positioning of modal on first render */
    modalRectangleTop?: number;
  };

export interface IModalStyles {
  root: IStyle;
  main: IStyle;
  scrollableContent: IStyle;
  layer: IStyle;
}
