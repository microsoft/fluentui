import * as React from 'react';
import { Check } from './Check';
import { IStyle, ITheme } from '@uifabric/Styling';

export interface ICheckProps extends React.Props<Check> {
  /**
   * Gets the component ref.
   */
  componentRef?: () => void;

  /**
   * Whether or not this menu item is currently checked.
   * @defaultvalue false
   */
  checked?: boolean;
  /**
   * Deprecated at v0.65.1 and will be removed by v 1.0. Use 'checked' instead.
   * @deprecated
   */
  isChecked?: boolean;

  alwaysShowCheck?: boolean;
}

export interface ICheckStyleProps {
  /**
   * Accept theme prop. Defaults to getTheme() function.
   * @defaultvalue getTheme()
   */
  theme?: ITheme;
  /**
   * Accept custom checkBox size in pixels.
   * @defaultvalue '18px'
   */
  checkBoxHeight?: string;
}

export interface ICheckStyles {
  /**
   * Style for the root element.
   */
  root?: IStyle;

  /**
   * Change child element styles based on isChecked state.
   */
  rootIsChecked?: IStyle;

  /**
   * The 'check' icon styles.
   */
  check?: IStyle;

  /**
   * ??? Has something to do with DetailsList row???
   */
  checkHost?: IStyle;

  /**
   * The 'circle' icon styles.
   */
  circle?: IStyle;
}