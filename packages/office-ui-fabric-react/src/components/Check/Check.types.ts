import * as React from 'react';
import { CheckBase } from './Check.base';
import { IStyle, ITheme } from '../../Styling';
import { IRefObject, IStyleFunctionOrObject } from '../../Utilities';

/**
 * {@docCategory Check}
 */
export interface ICheckProps extends React.ClassAttributes<CheckBase> {
  /**
   * Gets the component ref.
   */
  componentRef?: IRefObject<ICheckProps>;

  /**
   * Whether or not this menu item is currently checked.
   * @defaultvalue false
   */
  checked?: boolean;

  /**
   * Call to provide customized styling that will layer on top of the variant rules
   */
  styles?: IStyleFunctionOrObject<ICheckStyleProps, ICheckStyles>;

  /**
   * @deprecated Not used
   */
  alwaysShowCheck?: boolean;

  /**
   * Theme provided by HOC.
   */
  theme?: ITheme;

  /**
   * Additional css class to apply to the Check
   */
  className?: string;
}

/**
 * {@docCategory Check}
 */
export type ICheckStyleProps = Required<Pick<ICheckProps, 'theme'>> &
  Pick<ICheckProps, 'className' | 'checked'> & {
    /**
     * Custom height/width for the checkbox.
     * @defaultvalue '18px'
     */
    height?: string;

    /**
     * Custom height/width for the checkbox.
     * @defaultvalue '18px'
     * @deprecated Use `height`
     */
    checkBoxHeight?: string;
  };

/**
 * {@docCategory Check}
 */
export interface ICheckStyles {
  /**
   * Style for the root element.
   */
  root: IStyle;

  /**
   * The 'check' icon styles.
   */
  check: IStyle;

  /**
   * The 'circle' icon styles.
   */
  circle: IStyle;

  /**
   * Check host style
   * @deprecated Not used directly within the component. Instead, apply `CHECK_HOST_HOVER_STYLE`
   * from `Check.styles.ts` to the parent element of the check.
   */
  checkHost: IStyle;
}

/**
 * Props for a faster check component. Still in development, so props are subject to change.
 * @beta
 * {@docCategory Check}
 */
export type IFastCheckProps = Pick<ICheckProps, 'checked' | 'className' | 'styles' | 'theme'>;
