import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import { useTabsterAttributes } from '@fluentui/react-tabster';
import { useAccordionItemContext_unstable } from '../AccordionItem/index';
import { useContextSelector } from '@fluentui/react-context-selector';
import { AccordionContext } from '../Accordion/AccordionContext';
import type { AccordionPanelProps, AccordionPanelState } from './AccordionPanel.types';

/**
 * Returns the props and state required to render the component
 * @param props - AccordionPanel properties
 * @param ref - reference to root HTMLElement of AccordionPanel
 */
export const useAccordionPanel_unstable = (
  props: AccordionPanelProps,
  ref: React.Ref<HTMLElement>,
): AccordionPanelState => {
  const { open } = useAccordionItemContext_unstable();
  const focusableProps = useTabsterAttributes({ focusable: { excludeFromMover: true } });
  const navigation = useContextSelector(AccordionContext, ctx => ctx.navigation);

  return {
    open,
    components: {
      root: 'div',
    },
    root: getNativeElementProps('div', {
      ref,
      ...props,
      ...(navigation && focusableProps),
    }),
  };
};
