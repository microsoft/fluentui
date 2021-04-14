import * as React from 'react';
import {
  makeMergePropsCompat,
  resolveShorthandProps,
  useMergedRefs,
  useId,
  useDescendants,
} from '@fluentui/react-utilities';
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

// eslint-disable-next-line deprecation/deprecation
const mergeProps = makeMergePropsCompat<AccordionPanelState>({ deepMerge: accordionPanelShorthandProps });

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
  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
      id,
      open,
      role: 'region',
      'aria-labelledby': header?.id,
    },
    defaultProps,
    resolveShorthandProps(props, accordionPanelShorthandProps),
  );
  useAccordionItemDescendant(
    {
      element: state.ref.current,
      id,
    },
    1,
  );
  return state;
};
