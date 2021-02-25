import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, useMergedRefs } from '@fluentui/react-utilities';
import { AccordionProps, AccordionState } from './Accordion.types';
import { useCreateAccordionContext } from './useAccordionContext';

/**
 * Consts listing which props are shorthand props.
 */
export const accordionShorthandProps = [];

const mergeProps = makeMergeProps<AccordionState>({ deepMerge: accordionShorthandProps });

/**
 * Returns the props and state required to render the component
 * @param props Accordion properties
 * @param ref reference to root HTMLElement of Accordion
 * @param defaultProps default values for the properties of Accordion
 */
export const useAccordion = (
  props: AccordionProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: AccordionProps,
): AccordionState => {
  const [context, descendants, setDescendants] = useCreateAccordionContext();
  const state = mergeProps(
    {
      context,
      descendants,
      setDescendants,
      ref: useMergedRefs(ref, React.useRef(null)),
    },
    defaultProps,
    resolveShorthandProps(props, accordionShorthandProps),
  );

  return state;
};
