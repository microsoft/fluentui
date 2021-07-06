import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utilities';
import { AccordionProps, AccordionShorthandPropsCompat, AccordionState } from './Accordion.types';
import { useCreateAccordionContextValue } from './useAccordionContext';

/**
 * Const listing which props are shorthand props.
 */
export const accordionShorthandPropsCompat: AccordionShorthandPropsCompat[] = ['expandIcon', 'button', 'icon'];

const mergeProps = makeMergeProps<AccordionState>({ deepMerge: accordionShorthandPropsCompat });

/**
 * Returns the props and state required to render the component
 * @param props - Accordion properties
 * @param ref - reference to root HTMLElement of Accordion
 * @param defaultProps - default values for the properties of Accordion
 */
export const useAccordion = (
  props: AccordionProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: AccordionProps,
): AccordionState => {
  const state = mergeProps(
    {
      ref,
      collapsible: false,
      multiple: false,
      navigable: false,
      context: {
        navigable: false,
        openItems: [],
        requestToggle() {
          /* noop */
        },
      },
      descendants: [],
      setDescendants() {
        /* noop */
      },
    },
    defaultProps && resolveShorthandProps(defaultProps, accordionShorthandPropsCompat),
    resolveShorthandProps(props, accordionShorthandPropsCompat),
  );

  const [context, descendants, setDescendants] = useCreateAccordionContextValue(state);
  state.context = context;
  state.descendants = descendants;
  state.setDescendants = setDescendants;
  return state;
};
