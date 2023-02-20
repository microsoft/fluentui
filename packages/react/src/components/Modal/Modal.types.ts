import * as React from 'react';
import { ResponsiveMode } from '../../ResponsiveMode';
import type { IAccessiblePopupProps } from '../../common/IAccessiblePopupProps';
import type { IContextualMenuProps } from '../../ContextualMenu';
import type { IFocusTrapZoneProps } from '../../FocusTrapZone';
import type { IIconProps } from '../../Icon';
import type { ILayerProps } from '../../Layer';
import type { IOverlayProps } from '../../Overlay';
import type { IStyle, ITheme } from '../../Styling';
import type { IRefObject, IStyleFunctionOrObject } from '../../Utilities';
import { IPopupProps } from '../Popup/Popup.types';

export interface IDragOptions {
  /**
   * Optional selector for the element where the drag can be initiated. If not supplied when
   * isDraggable is true dragging can be initiated by the whole contents of the modal
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
  menu: React.FunctionComponent<IContextualMenuProps>;

  /**
   * Whether the draggable content should be prevented from going off-screen
   */
  keepInBounds?: boolean;
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
export interface IModalProps extends React.RefAttributes<HTMLDivElement>, IAccessiblePopupProps {
  children?: React.ReactNode;

  /**
   * Optional ref to access the `IModal` interface. Use this instead of `ref` for accessing
   * public API of the component.
   */
  componentRef?: IRefObject<IModal>;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IModalStyleProps, IModalStyles>;

  /**
   * Theme provided by higher-order component.
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
  onDismiss?: (ev?: React.MouseEvent<HTMLButtonElement | HTMLElement>) => any;

  /**
   * A callback function which is called after the Modal is dismissed and the animation is complete.
   */
  onDismissed?: () => any;

  /**
   * The specified responsiveMode value for Modal to use.
   * @default ResponsiveMode.small
   */
  responsiveMode?: ResponsiveMode;

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
   * @default false
   */
  isBlocking?: boolean;

  /**
   * Whether the dialog should be modeless (e.g. not dismiss when focusing/clicking outside of the dialog).
   * if true: isBlocking is ignored, there will be no overlay (isDarkOverlay is ignored),
   * isClickableOutsideFocusTrap is true, and forceFocusInsideTrap is false
   */
  isModeless?: boolean;

  /**
   * Determines the ARIA role of the dialog (alertdialog/dialog)
   * If this is set, it will override the ARIA role determined by isBlocking and isModeless
   *
   * For more information regarding dialogs please see https://w3c.github.io/aria-practices/#alertdialog
   */
  isAlert?: boolean;

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
   * @deprecated Use `layerProps.onLayerDidMount` instead
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

  /**
   * Allow body scroll on content and overlay on touch devices. Changing after mounting has no effect.
   * @default false
   */
  allowTouchBodyScroll?: boolean;

  /**
   * Puts aria-hidden=true on all non-ancestors of the current modal, for screen readers
   * (unless `isModeless` is true).
   * @default true
   * @deprecated Setting this to `false` is deprecated since it breaks modal behavior for some screen readers.
   * It will not be supported in future versions of the library (except for modeless modals).
   */
  enableAriaHiddenSiblings?: boolean;

  /**
   * Set of props to customize the `FocusTrapZone` inside of the `Modal`.
   * @default `{}`
   */
  focusTrapZoneProps?: IFocusTrapZoneProps;

  /**
   * Props to be passed through to Popup
   */
  popupProps?: IPopupProps;
}

/**
 * {@docCategory Modal}
 */
export type IModalStyleProps = Required<Pick<IModalProps, 'theme'>> &
  Pick<
    IModalProps,
    'className' | 'containerClassName' | 'scrollableContentClassName' | 'topOffsetFixed' | 'isModeless'
  > & {
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
    /** The windows inner height */
    windowInnerHeight?: number;
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
