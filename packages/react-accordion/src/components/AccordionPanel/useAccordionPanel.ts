import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, useMergedRefs, useId, useDescendants } from '@fluentui/react-utilities';
import { AccordionPanelProps, AccordionPanelState } from './AccordionPanel.types';
import {
  useAccordionItemContext,
  AccordionItemDescendant,
  useAccordionItemDescendant,
  accordionItemDescendantContext,
} from '../AccordionItem/index';

/**
 * Consts listing which props are shorthand props.
 */
export const accordionPanelShorthandProps = [];

const mergeProps = makeMergeProps<AccordionPanelState>({ deepMerge: accordionPanelShorthandProps });

/**
 * Returns the props and state required to render the component
 * @param props - AccordionPanel properties
 * @param ref - reference to root HTMLElement of AccordionPanel
 * @param defaultProps - default values for the properties of AccordionPanel
 */
export const useAccordionPanel = (
  props: AccordionPanelProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: AccordionPanelProps,
): AccordionPanelState => {
  const { open } = useAccordionItemContext();
  const id = useId('accordion-panel-', props.id);
  const header = useDescendants(accordionItemDescendantContext)[0] as AccordionItemDescendant | undefined;
  const innerRef = React.useRef<HTMLElement>(null);
  const state = mergeProps(
    {
      ref: useMergedRefs(ref, innerRef),
      id,
      open,
      role: 'region',
      'aria-labelledby': header?.id,
    },
    resolveShorthandProps(defaultProps, accordionPanelShorthandProps),
    resolveShorthandProps(props, accordionPanelShorthandProps),
  );
  useAccordionItemDescendant(
    {
      element: innerRef.current,
      id,
    },
    1,
  );
  return state;
};
