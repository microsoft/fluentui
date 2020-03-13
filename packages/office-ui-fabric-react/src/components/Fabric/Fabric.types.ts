import * as React from 'react';
import { IStyle, ITheme } from '../../Styling';
import { IRefObject, IStyleFunctionOrObject } from '../../Utilities';

export interface IFabricProps extends React.HTMLAttributes<HTMLDivElement> {
  componentRef?: IRefObject<{}>;

  /**
   * Overrides the root element type, defaults to `div`.
   */
  as?: React.ElementType;

  /**
   * Injected by the `styled` HOC wrapper.
   */
  theme?: ITheme;

  /**
   * Overrides the styles for the component.
   */
  styles?: IStyleFunctionOrObject<IFabricStyleProps, IFabricStyles>;

  /**
   * Applies the current body background specified in the theme to the root element.
   */
  applyTheme?: boolean;

  /**
   * Applies the current body background specified in the theme to the body element.
   */
  applyThemeToBody?: boolean;

  /**
   * Specifies the direction of the content. Will inject a `dir` attribute, and also ensure that the `rtl` flag of the
   * contextual theme object is set correctly so that css registered with merge-styles can be auto flipped correctly.
   */
  dir?: 'rtl' | 'ltr' | 'auto';
}

export interface IFabricStyleProps extends IFabricProps {
  theme: ITheme;
}

export interface IFabricStyles {
  root: IStyle;
  bodyThemed: IStyle;
}
