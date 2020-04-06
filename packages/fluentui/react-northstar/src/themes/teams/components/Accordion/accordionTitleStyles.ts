import { ComponentSlotStylesPrepared } from '@fluentui/styles';
import { AccordionTitleProps } from '../../../../components/Accordion/AccordionTitle';
import { AccordionVariables } from './accordionVariables';
import activeIndicatorUrl from './activeIndicatorUrl';
import { pxToRem } from '../../../../utils';

const accordionTitleStyles: ComponentSlotStylesPrepared<AccordionTitleProps, AccordionVariables> = {
  root: ({ props: p }) => ({
    display: 'inline-block',
    verticalAlign: 'middle',
    padding: '.5rem 0',
    cursor: p.disabled ? 'default' : 'pointer',
  }),
  contentWrapper: ({ props: p }) => ({
    display: 'grid',
    gridTemplateColumns: `auto ${p.content ? '1fr' : ''}`,
  }),
  indicator: ({ props: p, variables: v, rtl }) => ({
    alignItems: 'center',
    display: 'inline-flex',
    backgroundImage: activeIndicatorUrl(v.color, p.active),
    backgroundPosition: 'center',
    ...(rtl && {
      transform: `scaleX(-1)`,
    }),
    content: '" "',
    overflow: 'hidden',
    height: '100%',
    width: pxToRem(16),
    '-ms-grid-column': '1',
  }),
  content: () => ({
    alignItems: 'center',
    display: 'grid',
    '-ms-grid-column': '2',
  }),
};

export default accordionTitleStyles;
