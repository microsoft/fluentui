import * as React from 'react';
import {
  createDescendantContext,
  useDescendant,
  useDescendantsInit,
  DescendantContextValue,
  useMergedRefs,
} from '@fluentui/react-utilities';
import {
  AccordionItemProps,
  AccordionItemState,
  AccordionItemDescendant,
  AccordionItemShorthands,
  UninitializedAccordionItemState,
} from './AccordionItem.types';
import { useCreateAccordionItemContextValue } from './useAccordionItemContext';
import { useTabsterAttributes } from '@fluentui/react-tabster';
import { useContextSelector } from '@fluentui/react-context-selector';
import { AccordionContext } from '../Accordion/useAccordionContext';

/**
 * Consts listing which props are shorthand props.
 */
export const accordionItemShorthandProps: Array<keyof AccordionItemShorthands> = [];

export const accordionItemDescendantContext: React.Context<
  DescendantContextValue<AccordionItemDescendant<HTMLElement>>
> = createDescendantContext<AccordionItemDescendant>('AccordionItemDescendantContext');

/**
 * Returns the props and state required to render the component
 * @param props - AccordionItem properties
 * @param ref - reference to root HTMLElement of AccordionItem
 * @param defaultProps - default values for the properties of AccordionItem
 */
export const useAccordionItem = (props: AccordionItemProps, ref: React.Ref<HTMLElement>): AccordionItemState => {
  const innerRef = React.useRef<HTMLElement>(null);
  const uninitializedState: UninitializedAccordionItemState = {
    ref: useMergedRefs(ref, innerRef),
    disabled: false,
    ...props,
  };
  const [descendants, setDescendants] = useDescendantsInit<AccordionItemDescendant>();
  const state: AccordionItemState = {
    ...uninitializedState,
    descendants,
    setDescendants,
    context: useCreateAccordionItemContextValue(uninitializedState, innerRef),
  };
  const navigable = useContextSelector(AccordionContext, ctx => ctx.navigable);
  const tabsterAttributes = useTabsterAttributes({
    groupper: {},
  });
  if (navigable) {
    Object.assign(state, tabsterAttributes);
  }
  return state;
};

/**
 * Registers an descendant in the accordion descendants context
 */
export function useAccordionItemDescendant(
  accordionDescendant: Omit<AccordionItemDescendant, 'index'>,
  index?: number,
) {
  return useDescendant<AccordionItemDescendant>(accordionDescendant, accordionItemDescendantContext, index);
}
