import * as React from 'react';
import { getIntrinsicElementProps, slot, useEventCallback } from '@fluentui/react-utilities';
import type { AccordionItemProps, AccordionItemState } from './AccordionItem.types';
import type { AccordionToggleEvent } from '../Accordion/Accordion.types';
import { useAccordionContext_unstable } from '../../contexts/accordion';

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
  const onAccordionHeaderClick = useEventCallback((event: AccordionToggleEvent) => requestToggle({ event, value }));

  return {
    open,
    value,
    disabled,
    onHeaderClick: onAccordionHeaderClick,
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        // FIXME:
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: ref as React.Ref<HTMLDivElement>,
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
};
