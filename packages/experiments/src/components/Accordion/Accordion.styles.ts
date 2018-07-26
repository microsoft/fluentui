import { IStyleProps } from '../Text/createComponent';
import { IAccordionProps, IAccordionStyles } from './Accordion.types';

export const styles = (props: IStyleProps<IAccordionProps, IAccordionStyles>): IAccordionStyles => {
  return {
    root: [props.className]
  };
};
