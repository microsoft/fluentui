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
  contentWrapper: ({ props: p, variables: v }) => ({
    display: 'grid',
    gridTemplateColumns: 'auto',
    msGridColumns: 'auto',
    userSelect: 'none',
    ...(p.content && {
      gridTemplateColumns: 'auto 1fr',
      msGridColumns: 'auto 1fr',
    }),
    ':focus-visible': {
      borderRadius: v.focusBorderRadius,
      outline: `${v.focusBorderWidth} solid ${v.focusBorderColor}`,
    },
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
    marginRight: `${pxToRem(4)}`,
  }),
  content: () => ({
    alignItems: 'center',
    display: 'grid',
    msGridColumn: '2',
  }),
};
