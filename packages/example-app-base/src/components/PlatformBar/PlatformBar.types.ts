import { ITheme, IStyle, IStyleFunctionOrObject } from '@fluentui/react';
import { IPlatformPickerProps } from '../PlatformPicker/index';

export interface IPlatformBarProps<TPlatforms extends string = string> extends IPlatformPickerProps {
  theme?: ITheme;
  className?: string;
  styles?: IStyleFunctionOrObject<IPlatformBarStyleProps, IPlatformBarStyles>;

  /** The width of the inner container. */
  innerWidth?: number;
}

export interface IPlatformBarStyleProps {
  theme: ITheme;
  className?: string;
  platformColor?: string;
  innerWidth?: number;
}

export interface IPlatformBarStyles {
  root: IStyle;
  inner: IStyle;
  platformGrid: IStyle;
  platformButton: IStyle;
  platformIcon: IStyle;
}
