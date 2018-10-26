import * as React from 'react';
import { ITheme, IStyle } from '../../Styling';
import { IRefObject, IStyleFunctionOrObject } from '../../Utilities';

export interface ISpinner {}

export interface ISpinnerProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Optional callback to access the ISpinner interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<ISpinner>;

  /**
   * Deprecated and will be removed at \>= 2.0.0. Use `SpinnerSize` instead.
   * @deprecated Use `SpinnerSize` instead.
   */
  type?: SpinnerType;

  /**
   * The size of Spinner to render. \{ extraSmall, small, medium, large \}
   * @defaultvalue SpinnerType.medium
   */
  size?: SpinnerSize;

  /**
   * The label to show next to the Spinner. Label updates will be announced to the screen readers.
   * Use ariaLive to control politeness level.
   */
  label?: string;

  /**
   * Additional CSS class(es) to apply to the Spinner.
   */
  className?: string;

  /**
   * Politeness setting for label update announcement.
   * @defaultvalue polite
   */
  ariaLive?: 'assertive' | 'polite' | 'off';

  /**
   * Alternative status label for screen reader
   */
  ariaLabel?: string;

  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<ISpinnerStyleProps, ISpinnerStyles>;
}

export enum SpinnerSize {
  /**
   * 12px Spinner diameter
   */
  xSmall = 0,

  /**
   * 16px Spinner diameter
   */
  small = 1,

  /**
   * 20px Spinner diameter
   */
  medium = 2,

  /**
   * 28px Spinner diameter
   */
  large = 3
}

/**
 * Deprecated at v2.0.0, use `SpinnerSize` instead.
 * @deprecated Use `SpinnerSize` instead.
 */
export enum SpinnerType {
  /**
   * Deprecated and will be removed at \>= 2.0.0. Use `SpinnerSize.medium` instead.
   * @deprecated Use `SpinnerSize.medium` instead.
   */
  normal = 0,

  /**
   * Deprecated and will be removed at \>= 2.0.0. Use `SpinnerSize.large` instead.
   * @deprecated Use `SpinnerSize.large` instead.
   */
  large = 1
}

export interface ISpinnerStyleProps {
  theme: ITheme;
  size?: SpinnerSize;
  className?: string;
}

export interface ISpinnerStyles {
  root?: IStyle;
  circle?: IStyle;
  label?: IStyle;
  screenReaderText?: IStyle;
}
