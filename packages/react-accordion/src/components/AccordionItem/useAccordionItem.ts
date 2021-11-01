import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import { useTabsterAttributes } from '@fluentui/react-tabster';
import { useContextSelector } from '@fluentui/react-context-selector';
import { AccordionContext } from '../Accordion/AccordionContext';
import type { AccordionItemProps, AccordionItemState, AccordionItemSlots } from './AccordionItem.types';
import type { AccordionToggleEvent } from '../Accordion/Accordion.types';

/**
 * Const listing which props are shorthand props.
 */
export const accordionItemShorthandProps: Array<keyof AccordionItemSlots> = ['root'];

/**
 * Returns the props and state required to render the component
 * @param props - AccordionItem properties
 * @param ref - reference to root HTMLElement of AccordionItem
 */
export const useAccordionItem = (props: AccordionItemProps, ref: React.Ref<HTMLElement>): AccordionItemState => {
  const { value, disabled = false } = props;
  const navigable = useContextSelector(AccordionContext, ctx => ctx.navigable);
  const tabsterAttributes = useTabsterAttributes({
    groupper: {},
  });

  const requestToggle = useContextSelector(AccordionContext, ctx => ctx.requestToggle);
  const open = useContextSelector(AccordionContext, ctx => ctx.openItems.includes(value));
  const onAccordionHeaderClick = React.useCallback((ev: AccordionToggleEvent) => requestToggle(ev, { value }), [
    requestToggle,
    value,
  ]);

  return {
    open,
    value,
    disabled,
    onHeaderClick: onAccordionHeaderClick,
    root: getNativeElementProps('div', {
      ref: ref,
      ...(navigable ? tabsterAttributes : {}),
      ...props,
    }),
  };
};
