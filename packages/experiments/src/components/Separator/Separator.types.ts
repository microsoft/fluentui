import * as React from 'react';
import { SeparatorBase } from './Separator.base';
import { IStyleFunctionOrObject, IRefObject } from '../../Utilities';
import { IStyle, ITheme } from '../../Styling';

export interface ISeparator {}

export interface ISeparatorProps extends React.Props<SeparatorBase> {
  /**
   * Optional callback to access the IChiclet interface. Use this instead of ref for accessing
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
   * Optional text to display in the separator.
   */
  text?: string;

  /**
   * Whether the element is a vertical separator.
   */
  vertical?: boolean;

  /**
   * Where the text should be aligned in the separator.
   */
  alignText?: 'start' | 'center' | 'end';

  /**
   * Optional class for separator.
   */
  className?: string;
}

export interface ISeparatorStyleProps {
  /**
   * Theme for the component.
   */
  theme?: ITheme;

  /**
   * Accept custom classNames.
   */
  className?: string;

  /**
   * How to align text in the separator.
   */
  alignText?: 'start' | 'center' | 'end';

  /**
   * Whether the separator is vertical.
   */
  vertical?: boolean;
}

export interface ISeparatorStyles {
  /**
   * Style for the root element
   */
  root?: IStyle;

  /**
   * Style for vertical separator.
   */
  isVertical?: IStyle;

  /**
   * Text align
   */
  center?: IStyle;
  start?: IStyle;
  end?: IStyle;

  /**
   * Style for the text element
   */
  text?: IStyle;
}
