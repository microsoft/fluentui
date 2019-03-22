import { IStyle, ITheme } from '../../Styling';
import { IStyleFunctionOrObject } from '../../Utilities';

export interface IGroupSpacerProps {
  /**
   * Theme from Higher Order Component
   *
   * @deprecated unused, to be removed in 7.0
   */
  theme?: ITheme;

  /**
   * Style function to be passed in to override the themed or default styles
   *
   * @deprecated unused, to be removed in 7.0
   */
  styles?: IStyleFunctionOrObject<IGroupSpacerStyleProps, IGroupSpacerStyles>;

  /** Count of spacer(s) */
  count: number;

  /** How much to indent */
  indentWidth?: number;
}

/**
 * @deprecated unused, to be removed in 7.0. Use {@link IGroupSpacerProps.indentWidth}
 */
export type IGroupSpacerStyleProps = Required<Pick<IGroupSpacerProps, 'theme'>> & {
  width?: number;
};

/**
 * @deprecated unused, to be removed in 7.0.
 */
export interface IGroupSpacerStyles {
  root: IStyle;
}
