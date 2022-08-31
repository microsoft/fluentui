import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import { useAccordionContext_unstable } from '../Accordion/AccordionContext';
import type { AccordionItemProps, AccordionItemState } from './AccordionItem.types';
import type { AccordionToggleEvent } from '../Accordion/Accordion.types';

/**
 * Returns the props and state required to render the component
 * @param props - AccordionItem properties
 * @param ref - reference to root HTMLElement of AccordionItem
 */
export const useAccordionItem_unstable = (
  props: AccordionItemProps,
  ref: React.Ref<HTMLElement>,
): AccordionItemState => {
  const { value, disabled = false } = props;

  const requestToggle = useAccordionContext_unstable(ctx => ctx.requestToggle);
  const open = useAccordionContext_unstable(ctx => ctx.openItems.includes(value));
  const onAccordionHeaderClick = React.useCallback((ev: AccordionToggleEvent) => requestToggle(ev, { value }), [
    requestToggle,
    value,
  ]);

  return {
    open,
    disabled,
    onHeaderClick: onAccordionHeaderClick,
    components: {
      root: 'div',
    },
    root: getNativeElementProps('div', {
      ref: ref,
      ...props,
    }),
  };
};
