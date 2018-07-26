import { IStyle } from '../../Styling';

export interface IAccordionProps {
  renderAs?: string | React.ReactType<IAccordionProps>;
  children?: React.ReactNode;
  className?: string;

  collapseItems?: boolean;
}

export interface IAccordionStyles {
  root: IStyle;
}
