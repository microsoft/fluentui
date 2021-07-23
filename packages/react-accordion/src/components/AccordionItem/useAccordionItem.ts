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
  AccordionItemSlots,
} from './AccordionItem.types';
import { useTabsterAttributes } from '@fluentui/react-tabster';
import { useContextSelector } from '@fluentui/react-context-selector';
import { AccordionContext } from '../Accordion/AccordionContext';
import { useAccordionDescendant } from '../Accordion/AccordionContext';
import { AccordionToggleEvent } from '../Accordion/Accordion.types';

/**
 * Consts listing which props are shorthand props.
 */
export const accordionItemShorthandProps: Array<keyof AccordionItemSlots> = [];

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
  const [descendants, setDescendants] = useDescendantsInit<AccordionItemDescendant>();
  const navigable = useContextSelector(AccordionContext, ctx => ctx.navigable);
  const tabsterAttributes = useTabsterAttributes({
    groupper: {},
  });
  const disabled = props.disabled || false;

  const index = useAccordionDescendant({
    element: innerRef.current,
    disabled,
  });

  const requestToggle = useContextSelector(AccordionContext, ctx => ctx.requestToggle);
  const open = useContextSelector(AccordionContext, ctx => ctx.openItems.includes(index));
  const onAccordionHeaderClick = React.useCallback((ev: AccordionToggleEvent) => requestToggle(ev, { index }), [
    requestToggle,
    index,
  ]);

  return {
    ...props,
    ref: useMergedRefs(ref, innerRef),
    open,
    onHeaderClick: onAccordionHeaderClick,
    disabled,
    descendants,
    setDescendants,
    ...(navigable ? tabsterAttributes : {}),
  };
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
