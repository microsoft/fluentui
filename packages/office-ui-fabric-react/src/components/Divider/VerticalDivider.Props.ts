import { IVerticalDividerClassNames } from './VerticalDivider.classNames';
import { ITheme } from '../../Styling';

export interface IDivider {

}

export interface IVerticalDividerProps {
  /**
   * Optional callback to access the IDivider interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IDivider) => void;

  /**
   * Optional function to generate the class names for the divider for custom styling
   */
  getClassNames?: (theme: ITheme) => IVerticalDividerClassNames;
}