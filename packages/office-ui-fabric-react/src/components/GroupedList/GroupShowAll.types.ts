import { IStyle } from '../../Styling';
import { IGroupDividerProps } from './GroupedList.types';
import { IStyleFunctionOrObject } from '../../Utilities';

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

export type IGroupShowAllStyleProps = Required<Pick<IGroupShowAllProps, 'theme'>>;

export interface IGroupShowAllStyles {
  root: IStyle;
}
