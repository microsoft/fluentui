import * as React from 'react';
import { ThemePage } from './ThemePage';
import { IStyle, ITheme } from '../../Styling';
import { IStyleFunction } from '../../Utilities';

export interface IThemePageState {
  colors: {
    key: string;
    name: string;
    value: string;
    description: string;
  }[];

  colorPickerProps?: {
    targetElement: HTMLElement;
    value: any;
    index: number;
  };
}

export interface IThemePageStyleProps { }

export interface IThemePageStyles {
  colorSwatch: IStyle;
  swatch: IStyle;
  colorValue: IStyle;
}