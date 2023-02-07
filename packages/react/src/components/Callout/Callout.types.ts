import * as React from 'react';
import { DirectionalHint } from '../../common/DirectionalHint';
import type { IStyle, ITheme } from '../../Styling';
import type { IRectangle, IStyleFunctionOrObject } from '../../Utilities';
import type { ICalloutPositionedInfo } from '../../Positioning';
import type { ILayerProps } from '../../Layer';
import type { IPopupProps } from '../../Popup';
import type { Target } from '@fluentui/react-hooks';
import type { IPopupRestoreFocusParams } from '../../Popup';

/**
 * {@docCategory Callout}
 */
export interface ICalloutProps extends React.HTMLAttributes<HTMLDivElement>, React.RefAttributes<HTMLDivElement> {
  /**
   * The target that the Callout should try to position itself based on.
   * It can be an element, a query selector string of a valid element,
   * or a `MouseEvent`. If a `MouseEvent` is given, the origin point of the event will be used.
   */
  target?: Target;

  /**
   * How the element should be positioned
   * @defaultvalue DirectionalHint.BottomAutoEdge
   */
  directionalHint?: DirectionalHint;

  /**
   * How the element should be positioned in RTL layouts.
   * If not specified, a mirror of the `directionalHint` alignment edge will be used instead.
   * This means that `DirectionalHint.BottomLeft` will change to `DirectionalHint.BottomRight` but
   * `DirectionalHint.LeftAuto` will not change.
   */
  directionalHintForRTL?: DirectionalHint;

  /**
   * The gap between the Callout and the target, specified as number of pixels
   * @defaultvalue 0
   */
  gapSpace?: number;

  /**
   * The width of the beak.
   * @defaultvalue 16
   */
  beakWidth?: number;

  /**
   * Custom width for callout including borders. If value is 0, no width is applied.
   * @defaultvalue 0
   */
  calloutWidth?: number;

  /**
   * Maximum width for callout including borders. If value is 0, no width is applied.
   * @defaultvalue 0
   */
  calloutMaxWidth?: number;

  /**
   * Minimum width for callout including borders. If value is 0, no width is applied.
   * @defaultvalue 0
   */
  calloutMinWidth?: number;

  /**
   * The background color of the Callout in hex format ie. #ffffff.
   * @defaultvalue $ms-color-white
   */
  backgroundColor?: string;

  /**
   * The bounding rectangle the callout can appear in (or callback that returns a rectangle).
   */
  bounds?: IRectangle | ((target?: Target, targetWindow?: Window) => IRectangle | undefined);

  /**
   * The minimum distance the callout will be away from the edge of the screen.
   *  @defaultvalue 8
   */
  minPagePadding?: number;

  /**
   * Whether the beak is visible.
   * @defaultvalue true
   */
  isBeakVisible?: boolean;

  /**
   * If true then the callout will not dismiss on scroll
   * @defaultvalue false
   * @deprecated use preventDismissOnEvent callback instead
   */
  preventDismissOnScroll?: boolean;

  /**
   * If true then the callout will not dismiss on resize
   * @defaultvalue false
   * @deprecated use preventDismissOnEvent callback instead
   */
  preventDismissOnResize?: boolean;

  /**
   * If true then the callout will not dismiss when it loses focus
   * @defaultvalue false
   * @deprecated use preventDismissOnEvent callback instead
   */
  preventDismissOnLostFocus?: boolean;

  /**
   * If true then the callout will dismiss when the target element is clicked
   * @defaultvalue false
   */
  dismissOnTargetClick?: boolean;

  /**
   * If defined, then takes priority over `preventDismissOnLostFocus`, `preventDismissOnResize`,
   * and `preventDismissOnScroll`.
   * If it returns true, the callout will not dismiss for this event.
   * If not defined or returns false, the callout can dismiss for this event.
   */
  preventDismissOnEvent?: (ev: Event | React.FocusEvent | React.KeyboardEvent | React.MouseEvent) => boolean;

  /**
   * If true, callout will dismiss when the window gets focus.
   * @defaultvalue false
   */
  shouldDismissOnWindowFocus?: boolean;

  /**
   * If true, the callout element will be positioned to cover the target.
   * If false, it will position next to the target.
   * @defaultvalue false
   */
  coverTarget?: boolean;

  /**
   * If true the positioning logic will prefer to flip edges rather than to nudge the rectangle to fit within bounds,
   * thus making sure the element aligns perfectly with target's alignment edge.
   */
  alignTargetEdge?: boolean;

  /**
   * Aria role assigned to the callout (e.g. `dialog`, `alertdialog`).
   */
  role?: string;

  /**
   * Accessible label text for callout.
   */
  ariaLabel?: string;

  /**
   * ID of the element which contains label text for the callout.
   */
  ariaLabelledBy?: string;

  /**
   * ID of the element which contains the description for the callout.
   */
  ariaDescribedBy?: string;

  /**
   * CSS class to apply to the callout.
   * @defaultvalue null
   */
  className?: string;

  /**
   * CSS style to apply to the callout.
   *
   * If you set `overflowY` in this object, it provides a performance optimization by preventing
   * Popup (underlying component of Callout) from calculating whether it needs a scroll bar.
   */
  style?: React.CSSProperties;

  /**
   * Optional callback when the layer content has mounted.
   */
  onLayerMounted?: () => void;

  /**
   * Optional props to pass to the Layer component hosting the callout.
   */
  layerProps?: ILayerProps;

  /**
   * Optional props to pass the Popup component that the callout uses.
   */
  popupProps?: IPopupProps;

  /**
   * Optional callback that is called once the callout has been correctly positioned.
   * @param positions - Gives the user information about how the callout is positioned such as the
   * final edge of the target that it positioned against, the beak position, and the beak's relationship to the
   * edges of the callout.
   */
  onPositioned?: (positions?: ICalloutPositionedInfo) => void;

  /**
   * Callback when the Callout tries to close.
   */
  onDismiss?: (ev?: Event | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void;

  /**
   * If true, do not render on a new layer. If false, render on a new layer.
   */
  doNotLayer?: boolean;

  /**
   * If true the position will not change sides in an attempt to fit the callout within bounds.
   * It will still attempt to align it to whatever bounds are given.
   * @defaultvalue false
   */
  directionalHintFixed?: boolean;

  /**
   * Specify the final height of the content.
   * To be used when expanding the content dynamically so that callout can adjust its position.
   */
  finalHeight?: number;

  /**
   * Manually set `overflowYHidden` style prop to true on `calloutMain` element.
   * A variety of callout load animations will need this to hide the scollbar that can appear.
   */
  hideOverflow?: boolean;

  /**
   * If true, then the callout will attempt to focus the first focusable element that it contains.
   * If it doesn't find a focusable element, no focus will be set.
   */
  setInitialFocus?: boolean;

  /**
   * Set max height of callout.
   * When not set, the callout will expand with contents up to the bottom of the screen.
   */
  calloutMaxHeight?: number;

  /**
   * Callback when the Callout body is scrolled.
   */
  onScroll?: () => void;

  /**
   * Optional theme for component
   */
  theme?: ITheme;

  /**
   * Optional styles for the component.
   */
  styles?: IStyleFunctionOrObject<ICalloutContentStyleProps, ICalloutContentStyles>;

  /**
   * If specified, renders the Callout in a hidden state.
   * Use this flag, rather than rendering a callout conditionally based on visibility,
   * to improve rendering performance when it becomes visible.
   * Note: When callout is hidden its content will not be rendered. It will only render
   * once the callout is visible.
   */
  hidden?: boolean;

  /**
   * If true, the component will be updated even when `hidden` is true.
   * Note that this would consume resources to update even though nothing is being shown to the user.
   * This might be helpful though if your updates are small and you want the
   * callout to be revealed quickly to the user when `hidden` is set to false.
   */
  shouldUpdateWhenHidden?: boolean;

  /**
   * If specified, determines whether the underlying {@link Popup} component should try to restore
   * focus when it is dismissed.  When set to false, the Popup won't try to restore focus to
   * the last focused element.
   * @defaultvalue true
   * @deprecated use `onRestoreFocus` instead
   */
  shouldRestoreFocus?: boolean;

  /**
   * Called when the component is unmounting, and focus needs to be restored. If this is provided,
   * focus will not be restored automatically, and you'll need to call `params.originalElement.focus()`.
   */
  onRestoreFocus?: (params: IPopupRestoreFocusParams) => void;
}

/**
 * {@docCategory Callout}
 */
export interface ICalloutContentStyleProps {
  /**
   * Theme to apply to the callout content.
   */
  theme: ITheme;

  /**
   * Width for callout including borders.
   */
  calloutWidth?: number;

  /**
   * CSS class to apply to the callout.
   */
  className?: string;

  /**
   * Callout positioning data
   */
  positions?: ICalloutPositionedInfo;

  /**
   * Whether or not to clip content of the callout, if it overflows vertically.
   */
  overflowYHidden?: boolean;

  /**
   * Background color for the beak and callout.
   */
  backgroundColor?: string;

  /**
   * Width of Callout beak
   */
  beakWidth?: number;

  /**
   * Max width for callout including borders.
   */
  calloutMaxWidth?: number;

  /**
   * Min width for callout including borders.
   */
  calloutMinWidth?: number;

  /**
   * If true, a z-index should be set on the root element (since the Callout will not be rendered on a new layer).
   */
  doNotLayer?: boolean;
}

/**
 * {@docCategory Callout}
 */
export interface ICalloutContentStyles {
  /**
   * Style for wrapper of Callout component.
   */
  container: IStyle;

  /**
   * Style for callout container root element.
   */
  root: IStyle;

  /**
   * Style for callout beak.
   */
  beak: IStyle;

  /**
   * Style for callout beak curtain.
   */
  beakCurtain: IStyle;

  /**
   * Style for content component of the callout.
   */
  calloutMain: IStyle;
}

export type { Target };
