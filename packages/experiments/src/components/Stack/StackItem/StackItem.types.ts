import { IComponentStyles, IHTMLSpanSlot, IComponent, IStyleableComponentProps } from '../../../Foundation';

export type IStackItemComponent = IComponent<IStackItemProps, IStackItemTokens, IStackItemStyles>;

export interface IStackItemSlots {
  root?: IHTMLSpanSlot;
}

// These types are redundant with IStackItemComponent but are needed until TS function return widening issue is resolved:
// https://github.com/Microsoft/TypeScript/issues/241
// For now, these helper types can be used to provide return type safety when specifying tokens and styles functions.
export type IStackItemTokenReturnType = ReturnType<Extract<IStackItemComponent['tokens'], Function>>;
export type IStackItemStylesReturnType = ReturnType<Extract<IStackItemComponent['styles'], Function>>;

export interface IStackItemProps extends IStackItemSlots, IStyleableComponentProps<IStackItemProps, IStackItemTokens, IStackItemStyles> {
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

export interface IStackItemTokens {}

export type IStackItemStyles = IComponentStyles<IStackItemSlots>;
