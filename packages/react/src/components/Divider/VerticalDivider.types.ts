import * as React from 'react';
import type { ITheme, IStyle } from '../../Styling';
import type { IStyleFunctionOrObject } from '../../Utilities';

/**
 * {@docCategory VerticalDivider}
 * Props for the Vertical Divider
 */
export interface IVerticalDividerProps extends React.HTMLAttributes<HTMLElement>, React.RefAttributes<HTMLDivElement> {
  /**
   * Optional function to generate the class names for the divider for custom styling
   * @deprecated Use `styles` instead.
   */
  // eslint-disable-next-line deprecation/deprecation
  getClassNames?: (theme: ITheme) => IVerticalDividerClassNames;
  /**
   * The theme that should be used to render the vertical divider.
   */
  theme?: ITheme;
  /**
   * Optional override stylings that will get merged with the dividers styles.
   */
  styles?: IStyleFunctionOrObject<IVerticalDividerPropsStyles, IVerticalDividerStyles>;
  /**
   * className that will be placed on the divider wrapper div
   */
  className?: string;
}

/**
 * {@docCategory VerticalDivider}
 * Props that will get passed to the styling function to style the Vertical Divider
 */
export type IVerticalDividerPropsStyles = Pick<IVerticalDividerProps, 'theme' | 'getClassNames' | 'className'>;

/**
 * {@docCategory VerticalDivider}
 * Style interface that defines the different areas that styles can be customized on the Vertical Divider
 */
export interface IVerticalDividerStyles {
  /**
   * Styling for the div that wraps the actual divider
   */
  wrapper: IStyle;
  /**
   * Styling for the divider.
   */
  divider: IStyle;
}

/**
 * Deprecated class names, previously used to provide customizations.
 * {@docCategory VerticalDivider}
 * @deprecated Use IVerticalDividerStyles instead.
 */
export interface IVerticalDividerClassNames {
  /**
   * Styling for the div that wraps the actual divider
   */
  wrapper: string;

  /**
   * Styling for the divider.
   */
  divider: string;
}
