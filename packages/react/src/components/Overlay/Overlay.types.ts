import * as React from 'react';
import { IStyle, ITheme } from '../../Styling';
import { IRefObject, IStyleFunctionOrObject } from '../../Utilities';

/**
 * {@docCategory Overlay}
 */
export interface IOverlay {}

/**
 * {@docCategory Overlay}
 */
export interface IOverlayProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Gets the component ref.
   */
  componentRef?: IRefObject<IOverlay>;

  /**
   * Call to provide customized styling that will layer on top of the variant rules
   */
  styles?: IStyleFunctionOrObject<IOverlayStyleProps, IOverlayStyles>;

  /**
   * Theme provided by HOC.
   */
  theme?: ITheme;

  /**
   * Additional css class to apply to the Overlay
   * @defaultvalue undefined
   */
  className?: string;

  /**
   * Whether to use the dark-themed overlay.
   * @defaultvalue false
   */
  isDarkThemed?: boolean;

  onClick?: () => void;

  /**
   * Allow body scroll on touch devices. Changing after mounting has no effect.
   * @defaultvalue false
   */
  allowTouchBodyScroll?: boolean;
}

/**
 * {@docCategory Overlay}
 */
export interface IOverlayStyleProps {
  /**
   * Accept theme prop.
   */
  theme: ITheme;

  /**
   * Accept custom classNames
   */
  className?: string;

  /**
   * Is overlay visible
   */
  isNone?: boolean;

  /**
   * Is overlay dark themed
   */
  isDark?: boolean;
}

/**
 * {@docCategory Overlay}
 */
export interface IOverlayStyles {
  /**
   * Style for the root element.
   */
  root: IStyle;
}
