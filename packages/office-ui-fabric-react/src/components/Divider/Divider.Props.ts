export interface IDivider {

}

export interface IDividerProps {

  /**
   * Optional callback to access the IDivider interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IDivider) => void;

  /**
   * The height of the divider.
   */
  dividerHeight: number;

  /**
   * The color of the divider.
   */
  dividerColor: string;

  /**
   * An optional margin to apply to either side of the divider to
   * provide spacing between the elements to the left and right of the
   * divider.
   */
  dividerHorizontalMargin?: number;
}