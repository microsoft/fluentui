import * as React from 'react';
import { IRefObject, IStyleFunctionOrObject } from '../../Utilities';
import { IStyle, ITheme } from '../../Styling';
import { ScrollablePaneBase } from './ScrollablePane.base';
import { Sticky } from '../Sticky/Sticky';
import { StickyPositionType } from '../Sticky/Sticky.types';

/**
 * {@docCategory ScrollablePane}
 */
export interface IScrollablePane {
  /** Triggers a layout update for the pane. */
  forceLayoutUpdate(): void;
  /** Gets the current vertical scroll position of the scrollable pane */
  getScrollPosition(): number;
  /** Gets the current horizontal scroll position of the scrollable pane */
  getHorizontalScrollPosition(): number;
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
   * If true, it optimizes the performance, but may affect component behavior to some extent in few scenarios
   * where stickyClassName prop is used for Sticky component(s).
   * It is suggested to test the component so that it works as per the desired behavior.
   * Set it to true only if ScrollablePane has Sticky component(s).
   */
  experimentalLayoutImprovements?: boolean;

  /**
   * Determines the behavior of Sticky component(s) having stickyPosition StickyPosition.Header
   */
  stickyHeaderContainerBehavior?: IStickyContainerBehaviorType;

  /**
   * Determines the behavior of Sticky component(s) having stickyPosition StickyPosition.Footer
   */
  stickyFooterContainerBehavior?: IStickyContainerBehaviorType;
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
 * 'default': Sticky component(s) will become sticky or non-sticky whenever it is expected.
 *  If there is a large page having a Sticky component for which stickyPosition is 'StickyPosition.Footer'
 *  and this Sticky component is not in viewable area of the device screen,
 *  the 'default' behavior will make sure this component is displayed at it's sticky position, i.e.,
 *  at the bottom of the viewable area of the device screen, without requiring manual scroll.
 *
 *
 * 'onScroll' : Sticky component(s) will become sticky or non-sticky based on scrolling.
 *  The calculation which determine if a Sticky component is sticky or non-sticky,
 *  are done after user interaction (scrolling) and don't affect page load time.
 *  It is most suitable for stickyHeaderContainerBehavior.
 *
 *
 * 'always': Sticky component(s) will always be sticky independent of scrolling.
 *  There are no calculations done as the component(s) would always be sticky.
 *  It is most suitable if stickyPosition is:
 *   1. 'StickyPosition.Header' (i.e, for stickyHeaderContainerBehavior) and
 *       there is no non-sticky content above the Sticky component
 *   2. 'StickyPosition.Footer' (i.e, for stickyFooterContainerBehavior) and
 *       there is no non-sticky content below the Sticky component.
 */
export type IStickyContainerBehaviorType = 'default' | 'onScroll' | 'always';

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
    usePlaceholderForSticky: () => boolean;
    getHorizontalScrollPosition: () => number;
    verifyStickyContainerBehavior: (
      stickyContainerPosition: StickyPositionType,
      stickyContainerBehavior: IStickyContainerBehaviorType
    ) => boolean;
    getUserInteractionStatus: () => boolean;
  };
}

export const ScrollablePaneContext = React.createContext<IScrollablePaneContext>({ scrollablePane: undefined });
