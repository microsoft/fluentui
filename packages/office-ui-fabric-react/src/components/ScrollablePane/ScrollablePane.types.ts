import * as React from 'react';
import { ScrollablePaneBase } from './ScrollablePane.base';
import { IStyle, ITheme } from '../../Styling';
import { IStyleFunction } from '../../Utilities';

export interface IScrollablePane {
  /** Triggers a layout update for the pane. */
  forceLayoutUpdate(): void;
}

export interface IScrollablePaneProps extends React.HTMLAttributes<HTMLElement | ScrollablePaneBase> {
  // export interface IScrollablePaneProps extends React.Props<ScrollablePaneBase> {
  /**
   * Optional callback to access the IScrollablePane interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IScrollablePane) => void;

  /**
   * Call to provide customized styling that will layer on top of the variant rules
   */
  getStyles?: IStyleFunction<IScrollablePaneStyleProps, IScrollablePaneStyles>;

  /**
   * Theme provided by HOC.
   */
  theme?: ITheme;

  /**
   * Additional css class to apply to the ScrollablePane
   * @defaultvalue undefined
   */
  className?: string;
}

export interface IScrollablePaneStyleProps {
  /**
   * Accept theme prop.
   */
  theme: ITheme;

  /**
   * Accept custom classNames
   */
  className?: string;

  // Insert ScrollablePane style props below

}

export interface IScrollablePaneStyles {
  /**
   * Style set for the root element.
   */
  root: IStyle;
  /**
   * Style set for the stickyContainer element.
   */
  stickyContainer: IStyle;
  /**
   * Style set for the stickyAbove element.
   */
  stickyAbove: IStyle;
  /**
   * Style set for the stickyAbove element.
   */
  stickyBelow: IStyle;
}