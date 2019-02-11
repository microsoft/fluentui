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
   * Defines how to render the CardItem.
   */
  as?: string | React.ReactType<ICardItemProps>;

  /**
   * Defines if the default padding applies to this CardItem or not.
   * @defaultvalue false
   */
  preventPadding?: boolean;
}

export interface ICardItemTokens {}

export type ICardItemStyles = IComponentStyles<ICardItemSlots>;
