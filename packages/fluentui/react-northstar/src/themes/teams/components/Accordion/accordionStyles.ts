import { ComponentSlotStylesPrepared } from '@fluentui/styles';
import { AccordionStylesProps } from '../../../../components/Accordion/Accordion';

export const accordionStyles: ComponentSlotStylesPrepared<AccordionStylesProps> = {
  root: () => ({
    verticalAlign: 'middle',
    display: 'flex',
    flexDirection: 'column',
    marginBlockEnd: 0,
    marginBlockStart: 0,
  }),
};
