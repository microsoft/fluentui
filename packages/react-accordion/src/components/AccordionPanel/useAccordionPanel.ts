import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utilities';
import { useMergedRefs } from '@fluentui/react-hooks';
import { AccordionPanelProps, AccordionPanelState } from './AccordionPanel.types';

/**
 * Consts listing which props are shorthand props.
 */
export const accordionPanelShorthandProps = [];

const mergeProps = makeMergeProps<AccordionPanelState>({ deepMerge: accordionPanelShorthandProps });

/**
 * Returns the props and state required to render the component
 * @param props AccordionPanel properties
 * @param ref reference to root HTMLElement of AccordionPanel
 * @param defaultProps default values for the properties of AccordionPanel
 */
export const useAccordionPanel = (
  props: AccordionPanelProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: AccordionPanelProps,
): AccordionPanelState => {
  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
    },
    defaultProps,
    resolveShorthandProps(props, accordionPanelShorthandProps),
  );

  return state;
};
