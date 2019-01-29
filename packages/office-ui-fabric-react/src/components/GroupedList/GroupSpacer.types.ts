import { IStyle, ITheme } from '../../Styling';
import { IStyleFunctionOrObject } from '../../Utilities';

export interface IGroupSpacerProps {
  /**
   * Theme from Higher Order Component
   */
  theme?: ITheme;

  /**
   * Style function to be passed in to override the themed or default styles
   */
  styles?: IStyleFunctionOrObject<IGroupSpacerStyleProps, IGroupSpacerStyles>;

  /** Count of spacer(s) */
  count: number;

  /** How much to indent */
  indentWidth?: number;
}

export type IGroupSpacerStyleProps = Required<Pick<IGroupSpacerProps, 'theme'>> & {
  width?: number;
};

export interface IGroupSpacerStyles {
  root: IStyle;
}
