import { IVerticalDividerClassNames } from './VerticalDivider.classNames';

export interface IDivider {

}

export interface IVerticalDividerProps {
  /**
   * Optional callback to access the IDivider interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IDivider) => void;

  /**
   * Optional classnames to apply on the elements of the divider. This can be used to apply
   * custom styles to the divider.
   */
  classNames?: Partial<IVerticalDividerClassNames>;
}