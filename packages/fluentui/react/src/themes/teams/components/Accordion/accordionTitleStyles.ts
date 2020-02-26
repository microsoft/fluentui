import { ComponentSlotStylesPrepared } from '@fluentui/styles';
import { AccordionTitleProps } from '../../../../components/Accordion/AccordionTitle';

const accordionTitleStyles: ComponentSlotStylesPrepared<AccordionTitleProps> = {
  root: ({ props: p }) => ({
    display: 'inline-block',
    verticalAlign: 'middle',
    padding: '.5rem 0',
    cursor: p.disabled ? 'default' : 'pointer'
  }),
  content: ({ props: p }) => ({
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: `auto ${p.content ? '1fr' : ''}`
  }),
  indicator: () => ({
    userSelect: 'none'
  })
};

export default accordionTitleStyles;
