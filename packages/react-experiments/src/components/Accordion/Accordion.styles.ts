import type { IAccordionComponent, IAccordionStylesReturnType } from './Accordion.types';

export const styles: IAccordionComponent['styles'] = (props): IAccordionStylesReturnType => {
  return {
    root: [props.className],
  };
};
