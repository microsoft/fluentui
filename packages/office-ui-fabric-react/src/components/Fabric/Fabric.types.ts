import { IStyle, ITheme } from '../../Styling';
import { IStyleFunctionOrObject } from '../../Utilities';

export interface IFabricProps extends React.HTMLAttributes<HTMLDivElement> {
  componentRef?: () => void;
  theme?: ITheme;
  styles?: IStyleFunctionOrObject<IFabricStyleProps, IFabricStyles>;
}

export interface IFabricStyleProps extends IFabricProps {
  theme: ITheme;
  isFocusVisible: boolean;
}

export interface IFabricStyles {
  root: IStyle;
}
