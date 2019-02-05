import { IComponentStyles, IHTMLSlot, IComponent, IStyleableComponentProps } from '../../../Foundation';

export type IStackItemComponent = IComponent<IStackItemProps, IStackItemTokens, IStackItemStyles>;

export interface IStackItemSlots {
  root?: IHTMLSlot;
}

// These types are redundant with IStackItemComponent but are needed until TS function return widening issue is resolved:
// https://github.com/Microsoft/TypeScript/issues/241
// For now, these helper types can be used to provide return type safety when specifying tokens and styles functions.
export type IStackItemTokenReturnType = ReturnType<Extract<IStackItemComponent['tokens'], Function>>;
export type IStackItemStylesReturnType = ReturnType<Extract<IStackItemComponent['styles'], Function>>;

export interface IStackItemProps extends IStackItemSlots, IStyleableComponentProps<IStackItemProps, IStackItemTokens, IStackItemStyles> {
  /**
   * Defines how to render the StackItem.
   */
  as?: string | React.ReactType<IStackItemProps>;

  /**
   * Defines a CSS class name used to style the StackItem.
   */
  className?: string;

  /**
   * @internal Internal use only - gives the Stack component a handle on the children of its Stack.Items
   */
  children?: (React.ReactElement<IStackItemProps> | string)[] | React.ReactElement<IStackItemProps> | string;

  /**
   * Defines how much to grow the StackItem in proportion to its siblings.
   */
  grow?: boolean | number | 'inherit' | 'initial' | 'unset';

  /**
   * Defines at what ratio should the StackItem shrink to fit the available space.
   */
  shrink?: boolean | number | 'inherit' | 'initial' | 'unset';

  /**
   * Defines whether the StackItem should be prevented from shrinking.
   * This can be used to prevent a StackItem from shrinking when it is inside of a Stack that has shrinking items.
   * @defaultvalue false
   */
  preventShrink?: boolean;

  /**
   * Defines how to align the StackItem along the x-axis (for vertical Stacks) or the y-axis (for horizontal Stacks).
   */
  align?: 'auto' | 'stretch' | 'baseline' | 'start' | 'center' | 'end';

  /**
   * Defines whether the StackItem should take up 100% of the height of its parent.
   * @defaultvalue true
   */
  verticalFill?: boolean;
}

export interface IStackItemTokens {}

export type IStackItemStyles = IComponentStyles<IStackItemSlots>;
