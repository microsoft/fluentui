import { IStyle } from '../../Styling';
import { IHTMLDivSlot, IStatelessComponent, IStyleableComponentProps } from '../../Foundation';

export type IAccordionComponent = IStatelessComponent<IAccordionProps, IAccordionStyles>;

export interface IAccordionSlots {
  root?: IHTMLDivSlot;
}

export interface IAccordionProps extends IAccordionSlots, IStyleableComponentProps<IAccordionProps, IAccordionStyles> {
  collapseItems?: boolean;
}

export interface IAccordionStyles {
  root: IStyle;
}
