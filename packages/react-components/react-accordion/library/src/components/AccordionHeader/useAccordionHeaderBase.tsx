'use client';

import * as React from 'react';
import { getIntrinsicElementProps, useEventCallback, slot, isResolvedShorthand } from '@fluentui/react-utilities';
import { useARIAButtonProps } from '@fluentui/react-aria';
import type { AccordionHeaderProps, AccordionHeaderState } from './AccordionHeader.types';
import { useAccordionContext_unstable } from '../../contexts/accordion';
import { useAccordionItemContext_unstable } from '../../contexts/accordionItem';

type AccordionHeaderBaseProps = Omit<AccordionHeaderProps, 'inline' | 'size'>;

type AccordionHeaderBaseState = Omit<AccordionHeaderState, 'inline' | 'size'>;

/**
 * Returns the props and state required to render the component
 * @param props - AccordionHeader properties
 * @param ref - reference to root HTMLElement of AccordionHeader
 */
export const useAccordionHeaderBase_unstable = (
  props: AccordionHeaderBaseProps,
  ref: React.Ref<HTMLElement>,
): AccordionHeaderBaseState => {
  const { icon, button, expandIcon, expandIconPosition = 'start' } = props;
  const { value, disabled, open } = useAccordionItemContext_unstable();
  const requestToggle = useAccordionContext_unstable(ctx => ctx.requestToggle);

  /**
   * force disabled state on button if accordion isn't collapsible
   * and this is the only item opened
   */
  const disabledFocusable = useAccordionContext_unstable(ctx => !ctx.collapsible && ctx.openItems.length === 1 && open);

  const buttonSlot = slot.always(button, {
    elementType: 'button',
    defaultProps: {
      disabled,
      disabledFocusable,
      'aria-expanded': open,
      type: 'button',
    },
  });

  buttonSlot.onClick = useEventCallback(event => {
    if (isResolvedShorthand(button)) {
      button.onClick?.(event);
    }
    if (!event.defaultPrevented) {
      requestToggle({ value, event });
    }
  });

  return {
    disabled,
    open,
    expandIconPosition,
    components: {
      root: 'div',
      button: 'button',
      expandIcon: 'span',
      icon: 'div',
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
    icon: slot.optional(icon, { elementType: 'div' }),
    expandIcon: slot.optional(expandIcon, { elementType: 'span' }),
    button: useARIAButtonProps(buttonSlot.as, buttonSlot),
  };
};
