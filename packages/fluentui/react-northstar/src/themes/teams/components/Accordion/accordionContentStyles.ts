import { pxToRem } from '../../../../utils';
import type { ComponentSlotStylesPrepared } from '@fluentui/styles';
import type { AccordionContentStylesProps } from '../../../../components/Accordion/AccordionContent';

export const accordionContentStyles: ComponentSlotStylesPrepared<AccordionContentStylesProps> = {
  root: ({ props }) => ({
    display: 'none',
    verticalAlign: 'middle',
    ...(props.active && { display: 'block' }),
    marginInlineStart: `${pxToRem(20)}`,
  }),
};
