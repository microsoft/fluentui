import { IAccordionComponent } from './Accordion.types';

export const styles: IAccordionComponent['styles'] = props => {
  return {
    root: [props.className]
  };
};
