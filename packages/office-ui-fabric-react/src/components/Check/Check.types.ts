import { IStyle, ITheme } from '../../Styling';
import { IRefObject, IStyleFunctionOrObject } from '../../Utilities';

/**
 * {@docCategory Check}
 */
export interface ICheckProps {
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

  /**
   * Whether to use fast icon components. The icons can't be targeted by customization but are
   * still customizable via class names.
   */
  useFastIcons?: boolean;
}

/**
 * {@docCategory Check}
 */
export interface ICheckStyleProps {
  /**
   * Accept theme prop.
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

  /**
   * Controls whether to use the global check host class name (if true) or the old `$checkHost` (if false).
   * @deprecated This is a temporary measure in v6 *only* to opt in to fast checkbox styling.
   * This prop does not exist in v7.
   */
  useGlobalCheckHostClass?: boolean;
}

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
   * @deprecated If `useFastIcons` is true (default in 7), this is not used directly within the component.
   * Instead, use `CheckGlobalClassNames.checkHost` from `Check.styles.ts` to get the static class name to
   * apply to the parent element of the Check.
   */
  checkHost: IStyle;
}
