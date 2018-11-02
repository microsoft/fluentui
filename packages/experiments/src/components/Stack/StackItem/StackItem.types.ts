import { IStyle } from '../../../Styling';
import { IStatelessComponent, IStyleableComponentProps } from '../../../Foundation';

export type IStackItemComponent = IStatelessComponent<IStackItemProps, IStackItemStyles>;

export interface IStackItemProps extends IStyleableComponentProps<IStackItemProps, IStackItemStyles> {
  /**
   * How to render the StackItem.
   */
  as?: string | React.ReactType<IStackItemProps>;

  /**
   * CSS class name used to style the StackItem.
   */
  className?: string;

  /**
   * @internal Internal use only - gives the Stack component a handle on the children of its Stack.Items
   */
  children?: (React.ReactElement<IStackItemProps> | string)[] | React.ReactElement<IStackItemProps> | string;

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

  /**
   * Whether the StackItem should take up 100% of the width of its parent.
   */
  fillHorizontal?: boolean;

  /**
   * Whether the StackItem should take up 100% of the height of its parent.
   */
  fillVertical?: boolean;
}

export interface IStackItemStyles {
  /**
   * Style set for the root element.
   */
  root: IStyle;
}
