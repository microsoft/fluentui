import { ComponentSlotStylesPrepared } from '@fluentui/styles';
import { AccordionStylesProps } from '../../../../components/Accordion/Accordion';

const accordionStyles: ComponentSlotStylesPrepared<AccordionStylesProps> = {
  root: () => ({
    verticalAlign: 'middle',
    display: 'flex',
    flexDirection: 'column',
    marginBlockEnd: 0,
    marginBlockStart: 0,
  }),
};

export default accordionStyles;
