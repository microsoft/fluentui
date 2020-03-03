import { ComponentSlotStylesPrepared } from '@fluentui/styles';
import { AccordionTitleProps } from '../../../../components/Accordion/AccordionTitle';

const accordionTitleStyles: ComponentSlotStylesPrepared<AccordionTitleProps> = {
  root: ({ props: p }) => ({
    display: 'inline-block',
    verticalAlign: 'middle',
    padding: '.5rem 0',
    cursor: p.disabled ? 'default' : 'pointer'
  }),
  contentWrapper: ({ props: p }) => ({
    display: 'grid',
    gridTemplateColumns: `auto ${p.content ? '1fr' : ''}`
  }),
  indicator: () => ({
    userSelect: 'none',
    alignItems: 'center',
    display: 'inline-flex',
    '-ms-grid-column': '1'
  }),
  content: () => ({
    alignItems: 'center',
    display: 'grid',
    '-ms-grid-column': '2'
  })
};

export default accordionTitleStyles;
