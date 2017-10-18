import { IVerticalDividerClassNames } from './VerticalDivider.classNames';
import { ITheme } from '../../Styling';

export interface IVerticalDividerProps {
  /**
   * Optional function to generate the class names for the divider for custom styling
   */
  getClassNames?: (theme: ITheme) => IVerticalDividerClassNames;
}