import { IStyle } from '../../Styling';
import { IStatelessComponent, IStyleableComponentProps, IStylesProp } from '../../Foundation';

export type Alignment = 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'baseline' | 'stretch';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type IStackComponent = IStatelessComponent<IStackProps, IStackStyles>;

// contains the members of IStackProps that are common to both VerticalStack and HorizontalStack
export type IPartialStackProps = Omit<
  IStackProps,
  'verticalAlignment' | 'horizontalAlignment' | 'horizontal' | 'verticalGap' | 'horizontalGap' | 'wrap' | 'styles'
>;

export interface IStackProps extends IStyleableComponentProps<IStackProps, IStackStyles>, React.HTMLAttributes<HTMLElement> {
  /**
   * How to render the Stack.
   */
  as?: string | React.ReactType<IPartialStackProps>;

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
  horizontalAlignment?: Alignment;

  /**
   * How to align Stack child elements vertically (along the y-axis).
   */
  verticalAlignment?: 'top' | 'bottom' | Alignment;

  /**
   * Whether the Stack should take up 100% of the width of its parent.
   */
  fillHorizontal?: boolean;

  /**
   * Whether the Stack should take up 100% of the height of its parent.
   */
  fillVertical?: boolean;

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
   * Horizontal gap between Stack child elements.
   */
  horizontalGap?: number | string;

  /**
   * Vertical gap between Stack child elements.
   */
  verticalGap?: number | string;

  /**
   * Custom styles to apply to the Stack.
   */
  styles?: IStylesProp<IStackProps, IStackStyles>;
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
