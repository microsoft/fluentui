import { IStyle } from '../../Styling';
import { IStatelessComponent, IStyleableComponentProps } from '../../Foundation';

export type IAccordionComponent = IStatelessComponent<IAccordionProps, IAccordionStyles>;

export interface IAccordionProps extends IStyleableComponentProps<IAccordionProps, IAccordionStyles> {
  renderAs?: string | React.ReactType<IAccordionProps>;
  className?: string;

  collapseItems?: boolean;
}

export interface IAccordionStyles {
  root: IStyle;
}
