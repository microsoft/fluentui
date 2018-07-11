import { IStyle, ITheme } from '../../Styling';
import { IStyleFunctionOrObject } from '../..';

export interface IGroupSpacerProps {
  /** Theme, from context */
  theme?: ITheme;

  /** Overriding styles */
  styles?: IStyleFunctionOrObject<IGroupSpacerStyleProps, IGroupSpacerStyles>;

  /** Count of spacer(s) */
  count: number;

  /** How much to indent */
  indentWidth?: number;
}

export interface IGroupSpacerStyleProps {
  theme: ITheme;
}

export interface IGroupSpacerStyles {
  root: IStyle;
}
