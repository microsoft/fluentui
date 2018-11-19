import { ITheme } from '../../Styling';

export interface IVerticalDividerProps {
  /**
   * Optional function to generate the class names for the divider for custom styling
   */
  getClassNames?: (theme: ITheme) => IVerticalDividerClassNames;
}

export interface IVerticalDividerClassNames {
  wrapper: string;
  divider: string;
}
