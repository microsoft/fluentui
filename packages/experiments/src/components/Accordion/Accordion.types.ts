import { IStyle } from '../../Styling';
import { IHTMLDivSlot, IStatelessComponent, IStyleableComponentProps } from '../../Foundation';

export type IAccordionComponent = IStatelessComponent<IAccordionProps, IAccordionTokens, IAccordionStyles>;

export interface IAccordionSlots {
  root?: IHTMLDivSlot;
}

export interface IAccordionProps extends IAccordionSlots, IStyleableComponentProps<IAccordionProps, IAccordionTokens, IAccordionStyles> {
  collapseItems?: boolean;
}

export interface IAccordionTokens {}

export interface IAccordionStyles {
  root: IStyle;
}
