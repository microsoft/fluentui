import * as React from 'react';
import { AccordionItemProps, AccordionItemState, AccordionItemSlots } from './AccordionItem.types';
import { useTabsterAttributes } from '@fluentui/react-tabster';
import { useContextSelector } from '@fluentui/react-context-selector';
import { AccordionContext } from '../Accordion/AccordionContext';
import { AccordionToggleEvent } from '../Accordion/Accordion.types';

/**
 * Const listing which props are shorthand props.
 */
export const accordionItemShorthandProps: Array<keyof AccordionItemSlots> = [];

/**
 * Returns the props and state required to render the component
 * @param props - AccordionItem properties
 * @param ref - reference to root HTMLElement of AccordionItem
 * @param defaultProps - default values for the properties of AccordionItem
 */
export const useAccordionItem = (
  { value, ...props }: AccordionItemProps,
  ref: React.Ref<HTMLElement>,
): AccordionItemState => {
  // const [descendants, setDescendants] = useDescendantsInit<AccordionItemDescendant>();
  const navigable = useContextSelector(AccordionContext, ctx => ctx.navigable);
  const tabsterAttributes = useTabsterAttributes({
    groupper: {},
  });
  const disabled = props.disabled || false;

  const requestToggle = useContextSelector(AccordionContext, ctx => ctx.requestToggle);
  const open = useContextSelector(AccordionContext, ctx => ctx.openItems.includes(value));
  const onAccordionHeaderClick = React.useCallback((ev: AccordionToggleEvent) => requestToggle(ev, { value }), [
    requestToggle,
    value,
  ]);

  return {
    ...props,
    ref,
    open,
    onHeaderClick: onAccordionHeaderClick,
    disabled,
    ...(navigable ? tabsterAttributes : {}),
  };
};
