import * as React from 'react';
import { IStyle, ITheme } from '../../Styling';
import { IRefObject, IStyleFunctionOrObject } from '../../Utilities';

export interface IFabricProps extends React.HTMLAttributes<HTMLDivElement> {
  componentRef?: IRefObject<{}>;
  as?: React.ReactType;
  theme?: ITheme;
  styles?: IStyleFunctionOrObject<IFabricStyleProps, IFabricStyles>;
  applyTheme?: boolean;
  applyThemeToBody?: boolean;

  dir?: 'rtl' | 'ltr' | 'auto';
}

export interface IFabricStyleProps extends IFabricProps {
  theme: ITheme;
  isFocusVisible: boolean;
}

export interface IFabricStyles {
  root: IStyle;
  bodyThemed: IStyle;
}
