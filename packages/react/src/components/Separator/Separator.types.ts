import * as React from 'react';
import type { IStyleFunctionOrObject } from '../../Utilities';
import type { IStyle, ITheme } from '../../Styling';

/**
 * {@docCategory Separator}
 */
export interface ISeparator {}

/**
 * {@docCategory Separator}
 */
export interface ISeparatorProps extends React.HTMLAttributes<HTMLDivElement>, React.RefAttributes<HTMLDivElement> {
  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<ISeparatorStyleProps, ISeparatorStyles>;

  /**
   * Whether the element is a vertical separator.
   */
  vertical?: boolean;

  /**
   * Where the content should be aligned in the separator.
   * @defaultValue 'center'
   */
  alignContent?: 'start' | 'center' | 'end';
}

/**
 * {@docCategory Separator}
 */
export type ISeparatorStyleProps = Required<Pick<ISeparatorProps, 'theme'>> &
  Pick<ISeparatorProps, 'className' | 'alignContent' | 'vertical'>;

/**
 * {@docCategory Separator}
 */
export interface ISeparatorStyles {
  /**
   * Style for the root element
   */
  root: IStyle;

  /**
   * Style for the content
   */
  content: IStyle;
}
