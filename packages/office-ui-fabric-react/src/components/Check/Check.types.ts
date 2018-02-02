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
  theme?: ITheme;
  checkBoxHeight?: string;
}

export interface ICheckStyles {
  root?: IStyle;
  rootIsChecked?: IStyle;
  check?: IStyle;
  checkHost?: IStyle;
  circle?: IStyle;
}