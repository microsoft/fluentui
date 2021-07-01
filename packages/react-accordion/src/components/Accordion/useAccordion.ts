import * as React from 'react';
import { resolveShorthand } from '@fluentui/react-utilities';
import { AccordionProps, AccordionShorthands, AccordionState, UninitializedAccordionState } from './Accordion.types';
import { useCreateAccordionContextValue } from './useAccordionContext';

/**
 * Const listing which props are shorthand props.
 */
export const accordionShorthandProps: Array<keyof AccordionShorthands> = [];

/**
 * Returns the props and state required to render the component
 * @param props - Accordion properties
 * @param ref - reference to root HTMLElement of Accordion
 * @param defaultProps - default values for the properties of Accordion
 */
export const useAccordion = (props: AccordionProps, ref: React.Ref<HTMLElement>): AccordionState => {
  const uninitializedAccordionState: UninitializedAccordionState = {
    ref,
    collapsible: false,
    multiple: false,
    navigable: false,
    ...props,
    components: {
      root: 'div',
    },
    button: props.button ? resolveShorthand(props.button) : undefined,
    expandIcon: props.expandIcon ? resolveShorthand(props.expandIcon) : undefined,
    icon: props.icon ? resolveShorthand(props.icon) : undefined,
  };
  const [context, descendants, setDescendants] = useCreateAccordionContextValue(uninitializedAccordionState);
  return {
    ...uninitializedAccordionState,
    context,
    descendants,
    setDescendants,
  };
};
