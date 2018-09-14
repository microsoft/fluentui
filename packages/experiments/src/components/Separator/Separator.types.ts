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
   * Optional message to display in the separator.
   */
  message?: string;

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
   * Accept custom classNames
   */
  className?: string;
}

export interface ISeparatorStyles {
  /**
   * Style for the root element
   */
  root?: IStyle;

  /**
   * Style for the text element
   */
  text?: IStyle;
}
