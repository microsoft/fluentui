import { IComponentStyles, IHTMLSlot, IComponent, IStyleableComponentProps } from '../../../Foundation';

export type ICardItemComponent = IComponent<ICardItemProps, ICardItemTokens, ICardItemStyles>;

export interface ICardItemSlots {
  root?: IHTMLSlot;
}

// These types are redundant with ICardItemComponent but are needed until TS function return widening issue is resolved:
// https://github.com/Microsoft/TypeScript/issues/241
// For now, these helper types can be used to provide return type safety when specifying tokens and styles functions.
export type ICardItemTokenReturnType = ReturnType<Extract<ICardItemComponent['tokens'], Function>>;
export type ICardItemStylesReturnType = ReturnType<Extract<ICardItemComponent['styles'], Function>>;

export interface ICardItemProps extends ICardItemSlots, IStyleableComponentProps<ICardItemProps, ICardItemTokens, ICardItemStyles> {
  /**
   * Defines if the default horizontal padding of the Card applies to this CardItem child or not.
   * @defaultvalue false
   */
  disableChildPadding?: boolean;

  /**
   * Defines how much to grow the StackItem in proportion to its siblings.
   */
  grow?: boolean | number | 'inherit' | 'initial' | 'unset';

  /**
   * Defines at what ratio should the StackItem shrink to fit the available space.
   */
  shrink?: boolean | number | 'inherit' | 'initial' | 'unset';

  /**
   * Defines how to align the StackItem along the x-axis (for vertical Stacks) or the y-axis (for horizontal Stacks).
   */
  align?: 'auto' | 'stretch' | 'baseline' | 'flex-start' | 'center' | 'flex-end';
}

export interface ICardItemTokens {}

export type ICardItemStyles = IComponentStyles<ICardItemSlots>;
