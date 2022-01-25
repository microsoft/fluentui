import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import { useAccordionItemContext_unstable } from '../AccordionItem/index';
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
  return {
    open,
    components: {
      root: 'div',
    },
    root: getNativeElementProps('div', {
      ref,
      role: 'region',
      ...props,
    }),
  };
};
