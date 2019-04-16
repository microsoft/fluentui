import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { ITheme, IStyle } from '../../Styling';
import { IRefObject, IComponentAs, IStyleFunctionOrObject } from '../../Utilities';

/**
 * {@docCategory Label}
 */
export interface ILabel {}

/**
 * {@docCategory Label}
 */
export interface ILabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * Render the root element as another type.
   */
  as?: IComponentAs<React.AllHTMLAttributes<HTMLElement>>;

  /**
   * Optional callback to access the ILabel interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<ILabel>;

  /**
   * Whether the associated form field is required or not
   * @defaultvalue false
   */
  required?: boolean;

  /**
   * Renders the label as disabled.
   */
  disabled?: boolean;

  /**
   * Theme provided by HOC.
   */
  theme?: ITheme;

  /**
   * Styles for the label.
   */
  styles?: IStyleFunctionOrObject<ILabelStyleProps, ILabelStyles>;
}

/**
 * {@docCategory Label}
 */
export interface ILabelStyles {
  /**
   * Styles for the root element.
   */
  root: IStyle;
}

/**
 * {@docCategory Label}
 */
export interface ILabelStyleProps {
  /**
   *
   */
  theme: ITheme;
  className?: string;
  disabled?: boolean;
  required?: boolean;
}
