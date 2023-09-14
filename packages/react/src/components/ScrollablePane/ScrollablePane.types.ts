import * as React from 'react';
import { ScrollablePaneBase } from './ScrollablePane.base';
import { Sticky } from '../Sticky/Sticky';
import type { IRefObject, IStyleFunctionOrObject } from '../../Utilities';
import type { IStyle, ITheme } from '../../Styling';

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
  // export interface IScrollablePaneProps extends IReactProps<ScrollablePaneBase> {
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
   * Makes the scrollable container focusable, to aid with keyboard-only scrolling
   * Should only be set to true if the scrollable region will not contain any other focusable items
   * @defaultvalue false
   */
  scrollContainerFocus?: boolean;

  /**
   * If scrollContainerFocus is set to true, use this to give the container an accessible name
   */
  scrollContainerAriaLabel?: string;
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
 * {@docCategory ScrollablePane}
 */
export const ScrollbarVisibility = {
  auto: 'auto' as 'auto',
  always: 'always' as 'always',
};

/**
 * {@docCategory ScrollablePane}
 */
export type ScrollbarVisibility = (typeof ScrollbarVisibility)[keyof typeof ScrollbarVisibility];

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
  };
}

export const ScrollablePaneContext = React.createContext<IScrollablePaneContext>({ scrollablePane: undefined });
