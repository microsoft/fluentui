import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import { useAccordionItemContext_unstable } from '../AccordionItem/index';
import type { AccordionPanelProps, AccordionPanelState, AccordionPanelRender } from './AccordionPanel.types';
import { renderAccordionPanel_unstable } from './renderAccordionPanel';

/**
 * Returns the props and state required to render the component
 * @param props - AccordionPanel properties
 * @param ref - reference to root HTMLElement of AccordionPanel
 */
export const useAccordionPanel_unstable = (
  props: AccordionPanelProps,
  ref: React.Ref<HTMLElement>,
): [AccordionPanelState, AccordionPanelRender] => {
  const { open } = useAccordionItemContext_unstable();
  const state: AccordionPanelState = {
    open,
    components: {
      root: 'div',
    },
    root: getNativeElementProps('div', {
      ref,
      ...props,
    }),
  };

  return [state, renderAccordionPanel_unstable];
};
