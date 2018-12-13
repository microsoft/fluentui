import { IStyle } from '../../Styling';
import { IStatelessComponent, IStyleableComponentProps } from '../../Foundation';
import { IStyleFunctionOrObject } from '../../Utilities';

export type Alignment = 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'baseline' | 'stretch';

export type IStackComponent = IStatelessComponent<IStackProps, IStackStyles>;

export interface IStackProps extends IStyleableComponentProps<IStackProps, IStackStyles>, React.HTMLAttributes<HTMLElement> {
  /**
   * How to render the Stack.
   */
  as?: string | React.ReactType<IStackProps>;

  /**
   * CSS class name used to style the Stack.
   */
  className?: string;

  /**
   * Inline styling.
   */
  style?: React.CSSProperties;

  /**
   * Whether to render Stack child elements horizontally.
   * @defaultvalue false
   */
  horizontal?: boolean;

  /**
   * How to align Stack child elements horizontally (along the x-axis).
   */
  horizontalAlign?: Alignment;

  /**
   * How to align Stack child elements vertically (along the y-axis).
   */
  verticalAlign?: 'top' | 'bottom' | Alignment;

  /**
   * Whether the Stack should take up 100% of the width of its parent.
   */
  horizontalFill?: boolean;

  /**
   * Whether the Stack should take up 100% of the height of its parent.
   */
  verticalFill?: boolean;

  /**
   * Whether Stack child elements should shrink to fit the available space.
   */
  shrinkItems?: boolean;

  /**
   * How much to grow the Stack in proportion to its siblings.
   */
  grow?: boolean | number | 'inherit' | 'initial' | 'unset';

  /**
   * Spacing between Stack child elements.
   */
  gap?: number | string;

  /**
   * Vertical gap between Stack child elements.
   */
  verticalGap?: number | string;

  /**
   * Maximum width of the Stack.
   */
  maxWidth?: number | string;

  /**
   * Maximum height of the Stack.
   */
  maxHeight?: number | string;

  /**
   * Padding of the Stack.
   */
  padding?: number | string;

  /**
   * Whether Stack children should wrap onto multiple rows (HorizontalStacks only).
   * @defaultvalue false
   */
  wrap?: boolean;

  /**
   * Custom styles to apply to the Stack.
   */
  styles?: IStyleFunctionOrObject<IStackProps, IStackStyles>;
}

export interface IStackStyles {
  /**
   * Style set for the root element.
   */
  root: IStyle;

  /**
   * Style set for the inner element (only when the wrap property is true).
   */
  inner: IStyle;
}
