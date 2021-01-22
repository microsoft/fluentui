import { ComponentSlotStylesPrepared } from '@fluentui/styles';
import { AccordionContentStylesProps } from '../../../../components/Accordion/AccordionContent';
import { pxToRem } from '../../../../utils';

export const accordionContentStyles: ComponentSlotStylesPrepared<AccordionContentStylesProps> = {
  root: ({ props }) => ({
    display: 'none',
    verticalAlign: 'middle',
    ...(props.active && { display: 'block' }),
    marginInlineStart: `${pxToRem(20)}`,
  }),
};
