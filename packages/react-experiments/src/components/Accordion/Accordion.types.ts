import type { IStyle } from '../../Styling';
import type { IComponent, IHTMLSlot, IStyleableComponentProps } from '@fluentui/foundation-legacy';

export type IAccordionComponent = IComponent<IAccordionProps, IAccordionTokens, IAccordionStyles>;

// These types are redundant with IAccordionComponent but are needed until TS function
// return widening issue is resolved:
// https://github.com/Microsoft/TypeScript/issues/241
// For now, these helper types can be used to provide return type safety when specifying tokens and styles functions.
export type IAccordionTokenReturnType = ReturnType<Extract<IAccordionComponent['tokens'], Function>>;
export type IAccordionStylesReturnType = ReturnType<Extract<IAccordionComponent['styles'], Function>>;

export interface IAccordionSlots {
  root?: IHTMLSlot;
}

export interface IAccordionProps
  extends IAccordionSlots,
    IStyleableComponentProps<IAccordionProps, IAccordionTokens, IAccordionStyles> {
  collapseItems?: boolean;
}

export interface IAccordionTokens {}

export interface IAccordionStyles {
  root: IStyle;
}
