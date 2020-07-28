import { ComponentSlotStylesPrepared } from '@fluentui/styles';
import { AccordionTitleStylesProps } from '../../../../components/Accordion/AccordionTitle';
import { AccordionVariables } from './accordionVariables';
import { activeIndicatorUrl } from './activeIndicatorUrl';
import { pxToRem } from '../../../../utils';

export const accordionTitleStyles: ComponentSlotStylesPrepared<AccordionTitleStylesProps, AccordionVariables> = {
  root: ({ props: p }) => ({
    display: 'inline-block',
    verticalAlign: 'middle',
    padding: '.5rem 0',
    cursor: p.disabled ? 'default' : 'pointer',
  }),
  contentWrapper: ({ props: p }) => ({
    display: ['grid', '-ms-grid'],
    gridTemplateColumns: 'auto',
    msGridColumns: 'auto',

    ...(p.content && {
      gridTemplateColumns: 'auto 1fr',
      msGridColumns: 'auto 1fr',
    }),
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
    msGridColumn: '1',
  }),
  content: () => ({
    alignItems: 'center',
    display: 'grid',
    msGridColumn: '2',
  }),
};
