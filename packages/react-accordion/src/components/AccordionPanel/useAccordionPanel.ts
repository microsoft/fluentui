import * as React from 'react';
import { useMergedRefs, useId } from '@fluentui/react-utilities';
import { useAccordionItemContext } from '../AccordionItem/index';
import type { AccordionPanelProps, AccordionPanelSlots, AccordionPanelState } from './AccordionPanel.types';

/**
 * Consts listing which props are shorthand props.
 */
export const accordionPanelShorthandProps: Array<keyof AccordionPanelSlots> = [];

/**
 * Returns the props and state required to render the component
 * @param props - AccordionPanel properties
 * @param ref - reference to root HTMLElement of AccordionPanel
 * @param defaultProps - default values for the properties of AccordionPanel
 */
export const useAccordionPanel = (props: AccordionPanelProps, ref: React.Ref<HTMLElement>): AccordionPanelState => {
  const { open } = useAccordionItemContext();
  const id = useId('accordion-panel-', props.id);
  const innerRef = React.useRef<HTMLElement>(null);
  const state: AccordionPanelState = {
    open,
    role: 'region',
    // 'aria-labelledby': header?.id,
    ...props,
    ref: useMergedRefs(ref, innerRef),
    id,
  };
  return state;
};
