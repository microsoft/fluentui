import { IStyle } from '../../Styling';
import { IGroupDividerProps } from './GroupedList.types';
import { IStyleFunctionOrObject } from '../../Utilities';

/**
 * {@docCategory GroupedList}
 */
export interface IGroupShowAllProps extends IGroupDividerProps {
  /**
   * Style function to be passed in to override the themed or default styles
   */
  styles?: IStyleFunctionOrObject<IGroupShowAllStyleProps, IGroupShowAllStyles>;

  /**
   * The Show All link text.
   * @defaultvalue 'Show All'
   */
  showAllLinkText?: string;
}

/**
 * {@docCategory GroupedList}
 */
export type IGroupShowAllStyleProps = Required<Pick<IGroupShowAllProps, 'theme'>>;

/**
 * {@docCategory GroupedList}
 */
export interface IGroupShowAllStyles {
  root: IStyle;
}
