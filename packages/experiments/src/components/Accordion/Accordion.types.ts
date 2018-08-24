import { IStyle } from '../../Styling';
import { IStyleableComponentProps } from '../../Foundation';

export interface IAccordionProps extends IStyleableComponentProps<IAccordionProps, IAccordionStyles> {
  renderAs?: string | React.ReactType<IAccordionProps>;
  className?: string;

  collapseItems?: boolean;
}

export interface IAccordionStyles {
  root: IStyle;
}
