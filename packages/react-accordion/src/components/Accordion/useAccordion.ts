import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utils';
import { useMergedRefs } from '@fluentui/react-hooks';
import { AccordionProps, AccordionState } from './Accordion.types';

const mergeProps = makeMergeProps<AccordionState>();

/**
 * Returns the props and state required to render the component
 */
export const useAccordion = (
  props: AccordionProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: AccordionProps,
): AccordionState => {
  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
      role: 'accordion',
    },
    defaultProps,
    resolveShorthandProps(props, []),
  );

  return state;
};
