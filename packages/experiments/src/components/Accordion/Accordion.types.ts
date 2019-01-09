import { IStyle } from '../../Styling';
import { IStatelessComponent, IStyleableComponentProps } from '../../Foundation';

export type IAccordionComponent = IStatelessComponent<IAccordionProps, IAccordionStyles>;

import { IHTMLSlot } from '../../utilities/factoryComponents.types';

export interface IAccordionSlots {
  root?: IHTMLSlot;
}

export interface IAccordionProps extends IAccordionSlots, IStyleableComponentProps<IAccordionProps, IAccordionStyles> {
  collapseItems?: boolean;
}

export interface IAccordionStyles {
  root: IStyle;
}
