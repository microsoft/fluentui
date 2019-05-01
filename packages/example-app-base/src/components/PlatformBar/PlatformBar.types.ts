import { ITheme, IStyle, IStyleFunctionOrObject } from 'office-ui-fabric-react';
import { IPlatformPickerProps } from '../PlatformPicker/index';

export interface IPlatformBarProps extends IPlatformPickerProps {
  theme?: ITheme;
  className?: string;
  styles?: IStyleFunctionOrObject<IPlatformBarStyleProps, IPlatformBarStyles>;
}

export interface IPlatformBarStyleProps {
  theme: ITheme;
  className?: string;
  platformColor?: string;
}

export interface IPlatformBarStyles {
  root: IStyle;
  platformGrid: IStyle;
  platformButton: IStyle;
  platformIcon: IStyle;
}
