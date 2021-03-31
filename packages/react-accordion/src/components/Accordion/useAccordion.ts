import * as React from 'react';
import { makeMergePropsCompat, resolveShorthandProps, useMergedRefs } from '@fluentui/react-utilities';
import { AccordionProps, AccordionState } from './Accordion.types';
import { useCreateAccordionContext } from './useAccordionContext';
import { useArrowNavigationGroup } from '@fluentui/react-focus-management';

/**
 * Consts listing which props are shorthand props.
 */
export const accordionShorthandProps = ['expandIcon', 'button', 'icon'];

// eslint-disable-next-line deprecation/deprecation
const mergeProps = makeMergePropsCompat<AccordionState>({ deepMerge: accordionShorthandProps });

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
  const navigationAttributes = useArrowNavigationGroup({ circular: true });

  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
      collapsible: false,
      multiple: false,
      ...navigationAttributes,
    },
    defaultProps,
    resolveShorthandProps(props, accordionShorthandProps),
  );
  const [context, descendants, setDescendants] = useCreateAccordionContext(state);
  Object.assign(state, { context, descendants, setDescendants });

  return state;
};
