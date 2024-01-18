import * as React from 'react';
import { getIntrinsicElementProps, useEventCallback, slot, isResolvedShorthand } from '@fluentui/react-utilities';
import { useARIAButtonProps } from '@fluentui/react-aria';
import type { AccordionHeaderProps, AccordionHeaderState } from './AccordionHeader.types';
import { useAccordionContext_unstable } from '../../contexts/accordion';
import { ChevronRightRegular } from '@fluentui/react-icons';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { useAccordionItemContext_unstable } from '../../contexts/accordionItem';

/**
 * Returns the props and state required to render the component
 * @param props - AccordionHeader properties
 * @param ref - reference to root HTMLElement of AccordionHeader
 */
export const useAccordionHeader_unstable = (
  props: AccordionHeaderProps,
  ref: React.Ref<HTMLElement>,
): AccordionHeaderState => {
  const { icon, button, expandIcon, inline = false, size = 'medium', expandIconPosition = 'start' } = props;
  const { value, disabled, open } = useAccordionItemContext_unstable();
  const requestToggle = useAccordionContext_unstable(ctx => ctx.requestToggle);

  /**
   * force disabled state on button if accordion isn't collapsible
   * and this is the only item opened
   */
  const disabledFocusable = useAccordionContext_unstable(ctx => !ctx.collapsible && ctx.openItems.length === 1 && open);

  const { dir } = useFluent();

  // Calculate how to rotate the expand icon [>] (ChevronRightRegular)
  let expandIconRotation: 0 | 90 | -90 | 180;
  if (expandIconPosition === 'end') {
    // If expand icon is at the end, the chevron points up [^] when open, and down [v] when closed
    expandIconRotation = open ? -90 : 90;
  } else {
    // Otherwise, the chevron points down [v] when open, and right [>] (or left [<] in RTL) when closed
    expandIconRotation = open ? 90 : dir !== 'rtl' ? 0 : 180;
  }

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
    size,
    inline,
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
    expandIcon: slot.optional(expandIcon, {
      renderByDefault: true,
      defaultProps: {
        children: <ChevronRightRegular style={{ transform: `rotate(${expandIconRotation}deg)` }} />,
        'aria-hidden': true,
      },
      elementType: 'span',
    }),
    button: useARIAButtonProps(buttonSlot.as, buttonSlot),
  };
};
