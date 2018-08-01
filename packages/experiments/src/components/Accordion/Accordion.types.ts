import { IStyle } from '../../Styling';
import { IStyleableComponent } from '../../Foundation';

export interface IAccordionProps extends IStyleableComponent<IAccordionProps, IAccordionStyles> {
  renderAs?: string | React.ReactType<IAccordionProps>;
  className?: string;

  collapseItems?: boolean;
}

export interface IAccordionStyles {
  root: IStyle;
}
