import { IThemedProps } from '../../Foundation';
import { IAccordionProps, IAccordionStyles } from './Accordion.types';

export const styles = (props: IThemedProps<IAccordionProps>): IAccordionStyles => {
  return {
    root: [props.className]
  };
};
