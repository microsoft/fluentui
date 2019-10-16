import * as React from 'react';
import { IRefObject, IStyleFunctionOrObject } from '../../Utilities';
import { IStyle, ITheme } from '../../Styling';
import { ScrollablePaneBase } from './ScrollablePane.base';
import { Sticky } from '../Sticky/Sticky';

/**
 * {@docCategory ScrollablePane}
 */
export interface IScrollablePane {
  /** Triggers a layout update for the pane. */
  forceLayoutUpdate(): void;
  /** Gets the current scroll position of the scrollable pane */
  getScrollPosition(): number;
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

  scrollbarVisibility?: ScrollbarVisibility;

  /**
   * If true, it optimizes the performance, but may affect component behavior.
   * It is suggested to test the component so that it works as per the desired behavior.
   * Set it to true only if ScrollablePane has Sticky component(s) &
   * for no Sticky component, prop 'stickyPosition' is 'StickyPositionType.Both'.
   *
   * It assumes:
   * 1. 'OnScroll' sticky behavior for all Sticky components, props
   * 'stickyPosition' is 'StickyPositionType.Header',
   * 2. 'Always' sticky behavior for all Sticky components, prop
   * 'stickyPosition' is 'StickyPositionType.Footer'.
   *
   * 'onScroll' : Sticky component(s) will become sticky or non-sticky based on scrolling.
   * The calculation which determine if a Sticky component is sticky or non-sticky,
   * are done after user interaction (scrolling) and don't affect page load time.
   *
   * 'Always': Sticky component(s) will always be sticky independent of scrolling.
   *  There are no calculations done as the component(s) would always be sticky.
   */
  experimentalLayoutImprovements?: boolean;
}

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

  experimentalLayoutImprovements?: boolean;
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

export interface IScrollablePaneContext {
  scrollablePane?: {
    subscribe: (handler: (container: HTMLElement, stickyContainer: HTMLElement) => void) => void;
    unsubscribe: (handler: (container: HTMLElement, stickyContainer: HTMLElement) => void) => void;
    addSticky: (sticky: Sticky) => void;
    removeSticky: (sticky: Sticky) => void;
    updateStickyRefHeights: () => void;
    sortSticky: (sticky: Sticky, sortAgain?: boolean) => void;
    notifySubscribers: (sort?: boolean) => void;
    syncScrollSticky: (sticky: Sticky) => void;
    optimizePerformance: () => boolean;
    userInteractionStatus: () => boolean;
    getHorizontalScrollPosition: () => number;
  };
}

export const ScrollablePaneContext = React.createContext<IScrollablePaneContext>({ scrollablePane: undefined });
