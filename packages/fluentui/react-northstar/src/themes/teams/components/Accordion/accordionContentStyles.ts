import { ComponentSlotStylesPrepared } from '@fluentui/styles';
import { AccordionContentStylesProps } from '../../../../components/Accordion/AccordionContent';

const accordionContentStyles: ComponentSlotStylesPrepared<AccordionContentStylesProps> = {
  root: ({ props }) => ({
    display: 'none',
    verticalAlign: 'middle',
    ...(props.active && { display: 'block' }),
    marginInlineStart: 0,
  }),
};

export default accordionContentStyles;
