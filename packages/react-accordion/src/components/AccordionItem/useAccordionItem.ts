import * as React from 'react';
import { AccordionItemProps, AccordionItemState, AccordionItemSlots } from './AccordionItem.types';
import { useTabsterAttributes } from '@fluentui/react-tabster';
import { useContextSelector } from '@fluentui/react-context-selector';
import { AccordionContext } from '../Accordion/AccordionContext';
import { AccordionToggleEvent } from '../Accordion/Accordion.types';
import { getNativeElementProps } from '@fluentui/react-utilities';

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
    disabled,
    onHeaderClick: onAccordionHeaderClick,
    root: getNativeElementProps('div', {
      ref: ref,
      ...(navigable ? tabsterAttributes : {}),
      ...props,
    }),
  };
};
