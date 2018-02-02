import * as React from 'react';
import { CheckBase } from './Check.base';
import { IStyle, ITheme } from '@uifabric/Styling';
import { IStyleFunction } from '@uifabric/utilities';

export interface ICheckProps extends React.Props<CheckBase> {
  /**
   * Gets the component ref.
   */
  componentRef?: (component: ICheckProps) => void;

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

  /**
  * Call to provide customized styling that will layer on top of the variant rules
  */
  getStyles?: IStyleFunction<ICheckStyleProps, ICheckStyles>;

  /**
   * Flag to always show the check icon. Not currently working.
   */
  alwaysShowCheck?: boolean;

  /**
   * Theme provided by HOC.
   */
  theme?: ITheme;

  /**
   * Additional css class to apply to the Check
   * @defaultvalue undefined
   */
  className?: string;
}

export interface ICheckStyleProps {
  /**
   * Accept theme prop. Defaults to getTheme() function.
   * @defaultvalue getTheme()
   */
  theme: ITheme;

  /**
   * Accept custom classNames
   */
  className?: string;

  /**
   * Accept custom checkBox size in pixels.
   * @defaultvalue '18px'
   */
  checkBoxHeight?: string;

  checked?: boolean;
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