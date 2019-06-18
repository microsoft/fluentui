import * as React from 'react';
import { ScrollablePaneBase } from './ScrollablePane.base';
import { IStyle, ITheme } from '../../Styling';
import { IRefObject, IStyleFunctionOrObject } from '../../Utilities';

/**
 * {@docCategory ScrollablePane}
 */
export interface IScrollablePane {
  /** Triggers a layout update for the pane. */
  forceLayoutUpdate(): void;
  /** Gets the current scroll position of the scrollable pane */
  getScrollPosition(horizontal?: boolean): number;
}

/**
 * {@docCategory ScrollablePane}
 */
export interface IScrollablePaneProps extends React.HTMLAttributes<HTMLElement | ScrollablePaneBase> {
  // export interface IScrollablePaneProps extends React.Props<ScrollablePaneBase> {
  /**
   * Optional callback to access the IScrollablePane interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IScrollablePane>;

  /**
   * Call to provide customized styling that will layer on top of the variant rules
   */
  styles?: IStyleFunctionOrObject<IScrollablePaneStyleProps, IScrollablePaneStyles>;

  /**
   * Theme provided by HOC.
   */
  theme?: ITheme;

  /**
   * Additional css class to apply to the ScrollablePane
   * @defaultvalue undefined
   */
  className?: string;

  /**
   * Sets the initial scroll position of the ScrollablePane
   */
  initialScrollPosition?: number;

  /**
   * Determines the visibility of vertical and horizontal scrollbars.
   * If set to ScrollbarVisibility.always, scrollbars are visible always, independent of content overflow.
   */
  scrollbarVisibility?: ScrollbarVisibility;

  /**
   * Determies the behavior of Sticky component(s) having stickyPosition StickyPosition.Header
   */
  stickyAboveContainerBehavior?: IStickyContainerBehavior;

  /**
   * Determies the behavior of Sticky component(s) having stickyPosition StickyPosition.Footer
   */
  stickyBelowContainerBehavior?: IStickyContainerBehavior;
}

export interface IStickyContainerBehavior {
  /**
   * If true, it replicates actual element instead of keeping placeholder for the component which is to be sticky'ed.
   * Calculating placeholder height & width could be an expensive operation.
   * It's a trade off- cost of replicating the element vs. cost of calculating placeholder height & width.
   */
  notUsePlaceHolder: boolean;

  /**
   * If true, arranges stickies based on Sticky's 'order' prop in ascending order.
   */
  arrangeStickiesBasedOnOrder: boolean;

  /**
   * Determies when sticky behavior kicks in for Sticky component(s).
   * There are some calculations which determine if a Sticky component is sticky or non-sticky.
   * These calculations can be expensive and affect page load time.
   */
  containerBehavior: StickyContainerBehaviorType;
}

export enum StickyContainerBehaviorType {
  /**
   * This is the default behavior. It can affect page load time.
   */
  Default = 0,

  /**
   * Sticky component(s) will become sticky or non-sticky based on scrolling.
   * The calculation which determine if a Sticky component is sticky or non-sticky,
   * are done after user interaction (scrolling) and don't affect page load time.
   */
  StickyOnScroll = 1,

  /**
   * Sticky component(s) will always be sticky independent of scrolling.
   * There are no calculations done as the component(s) would always be sticky.
   */
  StickyAlways = 2
}

export type PlaceholderPosition = 'top' | 'bottom';

export type StickyContainerPosition = 'above' | 'below';

/**
 * {@docCategory ScrollablePane}
 */
export interface IScrollablePaneStyleProps {
  /**
   * Accept theme prop.
   */
  theme: ITheme;

  /**
   * Accept custom classNames
   */
  className?: string;

  scrollbarVisibility?: IScrollablePaneProps['scrollbarVisibility'];

  // Insert ScrollablePane style props below
}

/**
 * {@docCategory ScrollablePane}
 */
export interface IScrollablePaneStyles {
  /**
   * Style set for the root element.
   */
  root: IStyle;
  /**
   * Style set for the stickyAbove element.
   */
  stickyAbove: IStyle;
  /**
   * Style set for the stickyBelow element.
   */
  stickyBelow: IStyle;
  /**
   * Style set for the stickyBelowItems element.
   */
  stickyBelowItems: IStyle;
  /**
   * Style set for the contentContainer element.
   */
  contentContainer: IStyle;
}

/**
 * {@docCategory ScrollablePane}
 */
export const ScrollbarVisibility = {
  auto: 'auto' as 'auto',
  always: 'always' as 'always'
};

/**
 * {@docCategory ScrollablePane}
 */
export type ScrollbarVisibility = typeof ScrollbarVisibility[keyof typeof ScrollbarVisibility];
