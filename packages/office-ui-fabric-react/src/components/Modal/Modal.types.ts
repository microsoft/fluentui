import * as React from 'react';
import { ModalBase } from './Modal.base';
import { IWithResponsiveModeState } from '../../utilities/decorators/withResponsiveMode';
import { IAccessiblePopupProps } from '../../common/IAccessiblePopupProps';
import { IStyle, ITheme } from '../../Styling';
import { ILayerProps } from '../../Layer';
import { IRefObject, IStyleFunctionOrObject } from '../../Utilities';
import { IIconProps } from '../../Icon';
import { IContextualMenuProps } from '../../ContextualMenu';
import { IOverlayProps } from '../../Overlay';

export interface IDragOptions {
  /**
   * Optional selector for the element where the drag can be initiated. If not supplied when
   * isDraggable is true dragging can be initated by the whole contents of the modal
   */
  dragHandleSelector?: string;

  /**
   * IconProps for the icon used to indicate that the dialog is in keyboard move mode
   */
  keyboardMoveIconProps?: IIconProps;

  /**
   * The text to use for the modal move menu item
   */
  moveMenuItemText: string;

  /**
   * The text to use for the modal close menu item
   */
  closeMenuItemText: string;

  /**
   * The Draggable Control Menu so that the draggable zone can be moved via the keyboard
   */
  menu: React.StatelessComponent<IContextualMenuProps>;
}

/**
 * {@docCategory Modal}
 */
export interface IModal {
  /**
   * Sets focus on the first focusable, or configured, child in focus trap zone
   */
  focus: () => void;
}

/**
 * {@docCategory Modal}
 */
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
   * Defines an optional set of props to be passed through to Layer
   */
  layerProps?: ILayerProps;

  /**
   * Defines an optional set of props to be passed through to Overlay
   */
  overlay?: IOverlayProps;

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

  /**
   * The options to make the modal draggable
   */
  dragOptions?: IDragOptions;
}

/**
 * {@docCategory Modal}
 */
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
    /** Classname for layer element */
    layerClassName?: string;
    /** Whether this modal is draggable and using the default handler */
    isDefaultDragHandle?: boolean;
  };

/**
 * {@docCategory Modal}
 */
export interface IModalStyles {
  root: IStyle;
  main: IStyle;
  scrollableContent: IStyle;
  layer: IStyle;
  keyboardMoveIconContainer: IStyle;
  keyboardMoveIcon: IStyle;
}
