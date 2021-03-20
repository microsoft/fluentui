import * as React from 'react';
import { makeMergePropsCompat, resolveShorthandProps, useMergedRefs } from '@fluentui/react-utilities';
import { AccordionPanelProps, AccordionPanelState } from './AccordionPanel.types';
import { useAccordionItemContext } from '../AccordionItem/index';

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
  const { panelId, headingId, open } = useAccordionItemContext();
  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
      id: panelId,
      open,
      role: 'region',
      'aria-labelledby': headingId,
    },
    defaultProps,
    resolveShorthandProps(props, accordionPanelShorthandProps),
  );

  return state;
};
