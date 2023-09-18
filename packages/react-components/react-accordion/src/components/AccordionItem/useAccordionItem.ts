import * as React from 'react';
import { getNativeElementProps, slot } from '@fluentui/react-utilities';
import type { AccordionItemProps, AccordionItemState } from './AccordionItem.types';
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

  const open = useAccordionContext_unstable(ctx => ctx.openItems.includes(value));

  return {
    open,
    value,
    disabled,
    components: {
      root: 'div',
    },
    root: slot.always(getNativeElementProps('div', { ref, ...props }), { elementType: 'div' }),
  };
};
