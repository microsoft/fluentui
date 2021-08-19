import * as React from 'react';
import type { IStyle, ITheme } from '../../Styling';
import type { IRefObject, IStyleFunctionOrObject } from '../../Utilities';

/**
 * {@docCategory Check}
 */
export interface ICheckProps extends React.RefAttributes<HTMLDivElement> {
  /**
   * Gets the component ref.
   */
  componentRef?: IRefObject<ICheckProps>;

  /**
   * Whether the component is currently checked.
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

  /**
   * Whether to use fast icon components. The icons can't be targeted by customization but are
   * still customizable via class names.
   * @defaultvalue true
   */
  useFastIcons?: boolean;
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
   * @deprecated Not used directly within the component. Instead, use `CheckGlobalClassNames.checkHost` from
   * `Check.styles.ts` to get the static class name to apply to the parent element of the Check.
   */
  checkHost: IStyle;
}
