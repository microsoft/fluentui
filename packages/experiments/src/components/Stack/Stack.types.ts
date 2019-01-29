import { IComponentStyles, IHTMLDivSlot, ISlotProp, IComponent, IStyleableComponentProps } from '../../Foundation';

/**
 * Defines a type made by the union of the different values that the align-items and justify-content flexbox
 * properties can take.
 */
export type Alignment = 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'baseline' | 'stretch';

export type IStackComponent = IComponent<IStackProps, IStackTokens, IStackStyles>;

// These types are redundant with IStackComponent but are needed until TS function return widening issue is resolved:
// https://github.com/Microsoft/TypeScript/issues/241
// For now, these helper types can be used to provide return type safety when specifying tokens and styles functions.
export type IStackTokenReturnType = ReturnType<Extract<IStackComponent['tokens'], Function>>;
export type IStackStylesReturnType = ReturnType<Extract<IStackComponent['styles'], Function>>;

export type IStackSlot = ISlotProp<IStackProps>;

export interface IStackSlots {
  /**
   * Defines root slot of the component.
   */
  root?: IHTMLDivSlot;

  /**
   * Defines a slot that is place inside the root slot in order to achieve wrapping. Only used when the wrap
   * property is set to true.
   */
  inner?: IHTMLDivSlot;
}

export interface IStackProps
  extends IStackSlots,
    IStyleableComponentProps<IStackProps, IStackStyles, IStackTokens>,
    React.HTMLAttributes<HTMLElement> {
  /**
   * Defines how to render the Stack.
   */
  as?: string | React.ReactType<IStackProps>;

  /**
   * Defines whether to render Stack child elements horizontally.
   * @defaultvalue false
   */
  horizontal?: boolean;

  /**
   * Defines whether to render Stack child elements in the opposite direction (bottom-to-top if it's a vertical Stack and
   * right-to-left if it's a horizontal Stack).
   * @defaultvalue false
   */
  reversed?: boolean;

  /**
   * Defines how to align Stack child elements horizontally (along the x-axis).
   */
  horizontalAlign?: Alignment;

  /**
   * Defines how to align Stack child elements vertically (along the y-axis).
   */
  verticalAlign?: Alignment;

  /**
   * Defines whether the Stack should take up 100% of the height of its parent.
   * This property is required to be set to true when using the `grow` flag on children elements in vertical oriented Stacks.
   * Stacks are rendered as block elements and grow horizontally to the container already.
   * @defaultvalue false
   */
  verticalFill?: boolean;

  /**
   * Defines whether Stack children elements should not shrink to fit the available space.
   * @defaultvalue false
   */
  preventShrink?: boolean;

  /**
   * Defines how much to grow the Stack in proportion to its siblings.
   */
  grow?: boolean | number | 'inherit' | 'initial' | 'unset';

  /**
   * Defines the horizontal spacing between Stack child elements.
   */
  gap?: number | string;

  /**
   * Defines the vertical spacing between Stack child elements.
   */
  verticalGap?: number | string;

  /**
   * Defines the maximum width that the Stack can take.
   */
  maxWidth?: number | string;

  /**
   * Defines the maximum height that the Stack can take.
   */
  maxHeight?: number | string;

  /**
   * Defines the inner padding of the Stack.
   */
  padding?: number | string;

  /**
   * Defines whether Stack children should wrap onto multiple rows or columns when they are about to overflow
   * the size of the Stack.
   * @defaultvalue false
   */
  wrap?: boolean;
}

export interface IStackTokens {}

export type IStackStyles = IComponentStyles<IStackSlots>;
