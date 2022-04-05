import type { IStyle, ITheme } from '../../Styling';
import type { IStyleFunctionOrObject } from '../../Utilities';

/**
 * {@docCategory GroupedList}
 */
export interface IGroupSpacerProps {
  /**
   * @deprecated Unused. Will be removed in \>= 7.0
   */
  theme?: ITheme;

  /**
   * @deprecated Unused. Will be removed in \>= 7.0
   */
  // eslint-disable-next-line deprecation/deprecation
  styles?: IStyleFunctionOrObject<IGroupSpacerStyleProps, IGroupSpacerStyles>;

  /** Count of spacer(s) */
  count: number;

  /** How much to indent */
  indentWidth?: number;

  /** Override the default role (presentation) */
  role?: string;
}

/**
 * {@docCategory GroupedList}
 * @deprecated Unused. Use `IGroupSpacerProps.indentWidth`. Will be removed in \>= 7.0.
 */
export type IGroupSpacerStyleProps = Required<Pick<IGroupSpacerProps, 'theme'>> & {
  width?: number;
};

/**
 * {@docCategory GroupedList}
 * @deprecated Unused. Will be removed in \>= 7.0.
 */
export interface IGroupSpacerStyles {
  root: IStyle;
}
