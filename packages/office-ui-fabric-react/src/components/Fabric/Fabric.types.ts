import { IStyle, ITheme } from '../../Styling';

export interface IFabricProps extends React.HTMLAttributes<HTMLDivElement> {
  componentRef?: () => void;
  theme?: ITheme;
}

export interface IFabricStyleProps extends IFabricProps {
  theme: ITheme;
  isFocusVisible: boolean;
}

export interface IFabricStyles {
  root: IStyle;
}