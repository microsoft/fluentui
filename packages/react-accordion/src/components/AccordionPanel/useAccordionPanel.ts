import * as React from 'react';
import { useMergedRefs, useId, useDescendants } from '@fluentui/react-utilities';
import { AccordionPanelProps, AccordionPanelSlots, AccordionPanelState } from './AccordionPanel.types';
import {
  useAccordionItemContext,
  AccordionItemDescendant,
  useAccordionItemDescendant,
  accordionItemDescendantContext,
} from '../AccordionItem/index';

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
  const header = useDescendants(accordionItemDescendantContext)[0] as AccordionItemDescendant | undefined;
  const innerRef = React.useRef<HTMLElement>(null);
  const state: AccordionPanelState = {
    open,
    role: 'region',
    'aria-labelledby': header?.id,
    ...props,
    ref: useMergedRefs(ref, innerRef),
    id,
  };
  useAccordionItemDescendant(
    {
      element: innerRef.current,
      id,
    },
    1,
  );
  return state;
};
