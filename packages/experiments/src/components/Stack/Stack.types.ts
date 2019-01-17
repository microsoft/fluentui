import { IComponentStyles, IHTMLDivSlot, ISlotProp, IComponent, IStyleableComponentProps } from '../../Foundation';

export type Alignment = 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'baseline' | 'stretch';

export type IStackComponent = IComponent<IStackProps, IStackTokens, IStackStyles>;

// These types are redundant with IStackComponent but are needed until TS function return widening issue is resolved:
// https://github.com/Microsoft/TypeScript/issues/241
// For now, these helper types can be used to provide return type safety when specifying tokens and styles functions.
export type IStackTokenReturnType = ReturnType<Extract<IStackComponent['tokens'], Function>>;
export type IStackStylesReturnType = ReturnType<Extract<IStackComponent['styles'], Function>>;

export type IStackSlot = ISlotProp<IStackProps>;

export interface IStackSlots {
  root?: IHTMLDivSlot;
  inner?: IHTMLDivSlot;
}

export interface IStackProps
  extends IStackSlots,
    IStyleableComponentProps<IStackProps, IStackStyles, IStackTokens>,
    React.HTMLAttributes<HTMLElement> {
  /**
   * How to render the Stack.
   */
  as?: string | React.ReactType<IStackProps>;

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
}

export interface IStackTokens {}

export type IStackStyles = IComponentStyles<IStackSlots>;
