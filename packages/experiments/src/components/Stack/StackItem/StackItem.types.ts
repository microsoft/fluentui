import { IStyle } from '../../../Styling';
import { IStyleableComponentProps } from '../../../Foundation';

export interface IStackItemProps extends IStyleableComponentProps<IStackItemProps, IStackItemStyles> {
  /**
   * CSS class name used to style the StackItem.
   */
  className?: string;

  /**
   * How to render the StackItem.
   */
  renderAs?: string | React.ReactType<IStackItemProps>;

  /** @internal Internal use only - gives the Stack component a handle on the children of its Stack.Items */
  children?: (React.ReactElement<IStackItemProps> | string)[] | React.ReactElement<IStackItemProps> | string;

  /**
   * Top margin (for vertical StackItems) or left margin (for horizontal StackItems).
   */
  gap?: number;

  /**
   * Whether the StackItem is within a horizontal Stack.
   */
  horizontal?: boolean;

  /** @internal Internal use only - allows the Stack component to determine whether to apply a margin to the StackItem. */
  index?: number;

  /**
   * How much to grow the StackItem in proportion to its siblings.
   */
  grow?: boolean | number | 'inherit' | 'initial' | 'unset';

  /**
   * Whether the StackItem should shrink to fit the available space.
   */
  shrink?: boolean;

  /**
   * Whether the StackItem should be prevented from shrinking.
   * This can be used to prevent a StackItem from shrinking when it is inside of a Stack that has shrinkItems set to true.
   */
  preventShrink?: boolean;

  /**
   * How to align the StackItem along the x-axis (for vertical Stacks) or the y-axis (for horizontal Stacks).
   */
  align?: 'auto' | 'stretch' | 'baseline' | 'start' | 'center' | 'end';
}

export interface IStackItemStyles {
  /**
   * Style set for the root element.
   */
  root: IStyle;
}
