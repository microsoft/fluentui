import * as React from 'react';
import { IStyle, ITheme } from '../../Styling';
import { IStyleFunction } from '../../Utilities';

export interface IOverlay {

}

export interface IOverlayProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Gets the component ref.
   */
  componentRef?: (component: IOverlayProps | null) => void;

  /**
   * Call to provide customized styling that will layer on top of the variant rules
   */
  getStyles?: IStyleFunction<IOverlayStyleProps, IOverlayStyles>;

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
}

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

export interface IOverlayStyles {
  /**
   * Style for the root element.
   */
  root: IStyle;
}
