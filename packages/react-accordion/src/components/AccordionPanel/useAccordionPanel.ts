import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import { useAccordionItemContext } from '../AccordionItem/index';
import type { AccordionPanelProps, AccordionPanelSlots, AccordionPanelState } from './AccordionPanel.types';

/**
 * Const listing which props are shorthand props.
 */
export const accordionPanelShorthandProps: Array<keyof AccordionPanelSlots> = ['root'];

/**
 * Returns the props and state required to render the component
 * @param props - AccordionPanel properties
 * @param ref - reference to root HTMLElement of AccordionPanel
 */
export const useAccordionPanel = (props: AccordionPanelProps, ref: React.Ref<HTMLElement>): AccordionPanelState => {
  const { open } = useAccordionItemContext();
  return {
    open,
    root: getNativeElementProps('div', {
      ref,
      role: 'region',
      ...props,
    }),
  };
};
