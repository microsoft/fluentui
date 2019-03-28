import * as React from 'react';
import { SeparatorBase } from './Separator.base';
import { IStyleFunctionOrObject, IRefObject } from '../../Utilities';
import { IStyle, ITheme } from '../../Styling';

export interface ISeparator {}

export interface ISeparatorProps extends React.Props<SeparatorBase> {
  /**
   * Optional callback to access the ISeparator interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<ISeparator>;

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
   * @default 'center'
   */
  alignContent?: 'start' | 'center' | 'end';

  /**
   * Optional class for separator.
   */
  className?: string;
}

export type ISeparatorStyleProps = Required<Pick<ISeparatorProps, 'theme'>> &
  Pick<ISeparatorProps, 'className' | 'alignContent' | 'vertical'>;

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
