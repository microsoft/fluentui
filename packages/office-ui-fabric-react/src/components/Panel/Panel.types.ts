import * as React from 'react';
import { IFocusTrapZoneProps } from '../../FocusTrapZone';
import { ILayerProps } from '../../Layer';
import { IOverlayProps } from '../../Overlay';
import { IStyle, ITheme } from '../../Styling';
import { IRefObject, IRenderFunction, IStyleFunctionOrObject } from '../../Utilities';
import { PanelBase } from './Panel.base';

/**
 * {@docCategory Panel}
 */
export interface IPanel {
  /**
   * Forces the panel to open.
   */
  open: () => void;

  /**
   * Forces the panel to dismiss.
   */
  dismiss: (ev?: React.KeyboardEvent<HTMLElement>) => void;
}

/**
 * {@docCategory Panel}
 */
export interface IPanelProps extends React.HTMLAttributes<PanelBase> {
  /**
   * Optional callback to access the IPanel interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IPanel>;

  /**
   * Whether the panel is displayed.
   * If true, will cause panel to stay open even if dismissed.
   * If false, will cause panel to stay hidden.
   * If undefined, will allow the panel to control its own visility through open/dismiss methods.
   * @defaultvalue undefined
   */
  isOpen?: boolean;

  /**
   * Has the close button visible.
   * @defaultvalue true
   */
  hasCloseButton?: boolean;

  /**
   * Whether the panel can be light dismissed.
   * @defaultvalue false
   */
  isLightDismiss?: boolean;

  /**
   * Whether the panel is hidden on dismiss, instead of destroyed in the DOM.
   * Protects the contents from being destroyed when the panel is dismissed.
   * @defaultvalue false
   */
  isHiddenOnDismiss?: boolean;

  /**
   * Whether the panel uses a modal overlay or not
   * @defaultvalue true
   */
  isBlocking?: boolean;

  /**
   * Determines if content should stretch to fill available space putting footer at the bottom of the page
   * @defaultvalue false
   */
  isFooterAtBottom?: boolean;

  /**
   * Header text for the Panel.
   * @defaultvalue ""
   */
  headerText?: string;

  /**
   * A callback function for when the Panel is opened, before the animation completes.
   */
  onOpen?: () => void;

  /**
   * A callback function for when the Panel is opened, after the animation completes.
   */
  onOpened?: () => void;

  /**
   * A callback function for when the panel is closed, before the animation completes.
   * If the panel should NOT be dismissed based on some keyboard event, then simply call ev.preventDefault() on it
   */
  onDismiss?: (ev?: React.SyntheticEvent<HTMLElement>) => void;

  /**
   * A callback function which is called **after** the Panel is dismissed and the animation is complete.
   * (If you need to update the Panel's `isOpen` prop in response to a dismiss event, use `onDismiss` instead.)
   */
  onDismissed?: () => void;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IPanelStyleProps, IPanelStyles>;

  /**
   * Theme provided by High-Order Component.
   */
  theme?: ITheme;

  /**
   * Additional css class to apply to the Panel
   * @defaultvalue undefined
   */
  className?: string;

  /**
   * Type of the panel.
   * @defaultvalue PanelType.smallFixedFar
   */
  type?: PanelType;

  /**
   * Custom panel width, used only when `type` is set to `PanelType.custom`.
   */
  customWidth?: string;

  /**
   * Aria label on close button
   */
  closeButtonAriaLabel?: string;

  /**
   * Optional parameter to provider the class name for header text
   */
  headerClassName?: string;

  /**
   * Sets the HTMLElement to focus on when exiting the FocusTrapZone.
   * @defaultvalue The element.target that triggered the Panel.
   */
  elementToFocusOnDismiss?: HTMLElement;

  /**
   * Indicates if this Panel will ignore keeping track of HTMLElement that activated the Zone.
   * Deprecated, use `focusTrapZoneProps`.
   * @defaultvalue false
   * @deprecated Use `focusTrapZoneProps`.
   */
  ignoreExternalFocusing?: boolean;

  /**
   * Indicates whether Panel should force focus inside the focus trap zone.
   * If not explicitly specified, behavior aligns with FocusTrapZone's default behavior.
   * Deprecated, use `focusTrapZoneProps`.
   * @deprecated Use `focusTrapZoneProps`.
   */
  forceFocusInsideTrap?: boolean;

  /**
   * Indicates the selector for first focusable item.
   * Deprecated, use `focusTrapZoneProps`.
   * @deprecated Use `focusTrapZoneProps`.
   */
  firstFocusableSelector?: string;

  /**
   * Optional props to pass to the FocusTrapZone component to manage focus in the panel.
   */
  focusTrapZoneProps?: IFocusTrapZoneProps;

  /**
   * Optional props to pass to the Layer component hosting the panel.
   */
  layerProps?: ILayerProps;

  /**
   * Optional props to pass to the Overlay component that the panel uses.
   */
  overlayProps?: IOverlayProps;

  /**
   * Optional custom function to handle clicks outside the panel in lightdismiss mode
   */
  onLightDismissClick?: () => void;

  /**
   * Optional custom function to handle clicks outside this component
   */
  onOuterClick?: () => void;

  /**
   * Optional custom renderer navigation region. Replaces the region that contains the close button.
   */
  onRenderNavigation?: IRenderFunction<IPanelProps>;

  /**
   * Optional custom renderer for content in the navigation region. Replaces current close button.
   */
  onRenderNavigationContent?: IRenderFunction<IPanelProps>;

  /**
   * Optional custom renderer for header region. Replaces current title
   */
  onRenderHeader?: IPanelHeaderRenderer;

  /**
   * Optional custom renderer for body region. Replaces any children passed into the component.
   */
  onRenderBody?: IRenderFunction<IPanelProps>;

  /**
   * Optional custom renderer for footer region. Replaces sticky footer.
   */
  onRenderFooter?: IRenderFunction<IPanelProps>;

  /**
   * Custom renderer for content in the sticky footer
   */
  onRenderFooterContent?: IRenderFunction<IPanelProps>;

  /**
   * Deprecated property. Serves no function.
   * @deprecated Serves no function.
   */
  componentId?: string;
}

/**
 * Renderer function which takes an additional parameter, the ID to use for the element containing
 * the panel's title. This allows the `aria-labelledby` for the panel popup to work correctly.
 * Note that if `headerTextId` is provided, it **must** be used on an element, or screen readers
 * will be confused by the reference to a nonexistent ID.
 * {@docCategory Panel}
 */
export interface IPanelHeaderRenderer extends IRenderFunction<IPanelProps> {
  /**
   * @param props - Props given to the panel
   * @param defaultRender - Default header renderer. If using this renderer in code that does not
   * assign `headerTextId` to an element elsewhere, it **must** be passed to this function.
   * @param headerTextId - If provided, this **must** be used as the ID of an element containing the
   * panel's title, because the panel popup uses this ID as its aria-labelledby.
   */
  (props?: IPanelProps, defaultRender?: IPanelHeaderRenderer, headerTextId?: string | undefined): JSX.Element | null;
}

/**
 * {@docCategory Panel}
 */
export enum PanelType {
  /**
   * Renders the Panel with a `fluid` (full screen) width.
   * Recommended for use on small screen breakpoints.
   * - Small (320-479): full screen width, 16px left/right padding
   * - Medium (480-639): full screen width, 16px left/right padding
   * - Large (640-1023): full screen width, 32px left/right padding
   * - XLarge (1024-1365): full screen width, 32px left/right padding
   * - XXLarge (1366-up): full screen width, 40px left/right padding
   */
  smallFluid = 0,

  /**
   * Renders the Panel in fixed-width `small` size, anchored to the far side (right in LTR mode).
   * - Small (320-479): adapts to `PanelType.smallFluid` at this breakpoint
   * - Medium (480-639): 340px width, 16px left/right padding
   * - Large (640-1023): 340px width, 32px left/right padding
   * - XLarge (1024-1365): 340px width, 32px left/right padding
   * - XXLarge (1366-up): 340px width, 40px left/right padding
   */
  smallFixedFar = 1,

  /**
   * Renders the Panel in fixed-width `small` size, anchored to the near side (left in LTR mode).
   * - Small (320-479): 272px width, 16px left/right padding
   * - Medium (480-639): 272px width, 16px left/right padding
   * - Large (640-1023): 272px width, 32px left/right padding
   * - XLarge (1024-1365): 272px width, 32px left/right padding
   * - XXLarge (1366-up): 272px width, 40px left/right padding
   */
  smallFixedNear = 2,

  /**
   * Renders the Panel in `medium` size, anchored to the far side (right in LTR mode).
   * - Small (320-479): adapts to `PanelType.smallFluid` at this breakpoint
   * - Medium (480-639): adapts to `PanelType.smallFixedFar` at this breakpoint
   * - Large (640-1023): 592px width, 32px left/right padding
   * - XLarge (1024-1365): 644px width, 32px left/right padding
   * - XXLarge (1366-up): 644px width, 40px left/right padding
   */
  medium = 3,

  /**
   * Renders the Panel in `large` size, anchored to the far side (right in LTR mode).
   * - Small (320-479): adapts to `PanelType.smallFluid` at this breakpoint
   * - Medium (480-639):  adapts to `PanelType.smallFixedFar` at this breakpoint
   * - Large (640-1023): adapts to `PanelType.medium` at this breakpoint
   * - XLarge (1024-1365): 48px fixed left margin, fluid width, 32px left/right padding
   * - XXLarge (1366-up): 428px fixed left margin, fluid width, 40px left/right padding
   */
  large = 4,

  /**
   * Renders the Panel in `large` size, anchored to the far side (right in LTR mode), with a fixed width at XX-Large breakpoint.
   * - Small (320-479): adapts to `PanelType.smallFluid` at this breakpoint
   * - Medium (480-639): adapts to `PanelType.smallFixedFar` at this breakpoint
   * - Large (640-1023): adapts to `PanelType.medium` at this breakpoint
   * - XLarge (1024-1365): 48px fixed left margin, fluid width, 32px left/right padding
   * - XXLarge (1366-up): 940px width, 40px left/right padding
   */
  largeFixed = 5,

  /**
   * Renders the Panel in `extra large` size, anchored to the far side (right in LTR mode).
   * - Small (320-479): adapts to `PanelType.smallFluid` at this breakpoint
   * - Medium (480-639): adapts to `PanelType.smallFixedFar` at this breakpoint
   * - Large (640-1023): adapts to `PanelType.medium` at this breakpoint
   * - XLarge (1024-1365): adapts to `PanelType.large` at this breakpoint
   * - XXLarge (1366-1919): 176px fixed left margin, fluid width, 40px left/right padding
   * - XXXLarge (1920-up): 176px fixed left margin, fluid width, 40px left/right padding
   */
  extraLarge = 6,

  /**
   * Renders the Panel in `custom` size using `customWidth`, anchored to the far side (right in LTR mode).
   * - Has a fixed width provided by the `customWidth` prop
   * - When screen width reaches the `customWidth` value it will behave like a fluid width Panel
   * taking up 100% of the viewport width
   */
  custom = 7,

  /**
   * Renders the Panel in `custom` size using `customWidth`, anchored to the near side (left in LTR mode).
   * - Has a fixed width provided by the `customWidth` prop
   * - When screen width reaches the `customWidth` value it will behave like a fluid width Panel
   * taking up 100% of the viewport width
   */
  customNear = 8
}

/**
 * {@docCategory Panel}
 */
export interface IPanelStyleProps {
  /**
   * Theme provided by High-Order Component.
   */
  theme: ITheme;

  /**
   * Accept custom classNames
   */
  className?: string;

  /**
   * Is Panel open
   */
  isOpen?: boolean;

  /**
   * Is animation currently running
   */
  isAnimating?: boolean;

  /**
   * Is panel on right side
   */
  isOnRightSide?: boolean;

  /**
   * Is panel hidden on dismiss
   */
  isHiddenOnDismiss?: boolean;

  /**
   * Classname for FocusTrapZone element
   */
  focusTrapZoneClassName?: string;

  /**
   * Determines if content should stretch to fill available space putting footer at the bottom of the page
   */
  isFooterAtBottom?: boolean;

  /**
   * Based on state value setting footer to sticky or not
   */
  isFooterSticky?: boolean;

  /**
   * Panel has close button
   */
  hasCloseButton?: boolean;

  /**
   * Type of the panel.
   */
  type?: PanelType;

  /**
   * Optional parameter to provider the class name for header text
   */
  headerClassName?: string;
}

// TODO -Issue #5689: Comment in once Button is converted to mergeStyles
// export interface IPanelSubComponentStyles {
//   /**
//    * Styling for Icon child component.
//    */
//   // TODO: this should be the interface once we're on TS 2.9.2 but otherwise causes errors in 2.8.4
//   // button: IStyleFunctionOrObject<IButtonStyleProps, IButtonStyles>;
//   button: IStyleFunctionOrObject<any, any>;
// }

/**
 * {@docCategory Panel}
 */
export interface IPanelStyles {
  /**
   * Style for the root element.
   */
  root: IStyle;

  /**
   * Style for the overlay element.
   */
  overlay: IStyle;

  /**
   * Style for the hidden element.
   */
  hiddenPanel: IStyle;

  /**
   * Style for the main section element.
   */
  main: IStyle;

  /**
   * Style for the navigation container element.
   */
  commands: IStyle;

  /**
   * Style for the Body and Footer container element.
   */
  contentInner: IStyle;

  /**
   * Style for the scrollable content area container element.
   */
  scrollableContent: IStyle;

  /**
   * Style for the close button container element.
   */
  navigation: IStyle;

  /**
   * Style for the close button IconButton element.
   */
  closeButton: IStyle;

  /**
   * Style for the header container div element.
   */
  header: IStyle;

  /**
   * Style for the header inner p element.
   */
  headerText: IStyle;

  /**
   * Style for the body div element.
   */
  content: IStyle;

  /**
   * Style for the footer div element.
   */
  footer: IStyle;

  /**
   * Style for the inner footer div element.
   */
  footerInner: IStyle;

  // TODO -Issue #5689: Comment in once Button is converted to mergeStyles
  /**
   * Styling for subcomponents.
   */
  // subComponentStyles: IPanelSubComponentStyles;
}
