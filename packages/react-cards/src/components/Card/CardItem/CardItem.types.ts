import { IComponentStyles, IHTMLSlot, IComponent, IStyleableComponentProps } from '@uifabric/foundation';
import { IStackItemProps } from 'office-ui-fabric-react';

export type ICardItemComponent = IComponent<ICardItemProps & IStackItemProps, ICardItemTokens, ICardItemStyles>;

export interface ICardItemSlots {
  root?: IHTMLSlot;
}

// These types are redundant with ICardItemComponent but are needed until TS function return widening issue is resolved:
// https://github.com/Microsoft/TypeScript/issues/241
// For now, these helper types can be used to provide return type safety when specifying tokens and styles functions.
export type ICardItemTokenReturnType = ReturnType<Extract<ICardItemComponent['tokens'], Function>>;
export type ICardItemStylesReturnType = ReturnType<Extract<ICardItemComponent['styles'], Function>>;

export interface ICardItemProps extends ICardItemSlots, IStyleableComponentProps<ICardItemProps, ICardItemTokens, ICardItemStyles> {}

export interface ICardItemTokens {
  margin?: number | string;
}

export type ICardItemStyles = IComponentStyles<ICardItemSlots>;
