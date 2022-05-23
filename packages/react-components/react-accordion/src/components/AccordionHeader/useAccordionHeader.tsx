import * as React from 'react';
import { getNativeElementProps, resolveShorthand, useEventCallback } from '@fluentui/react-utilities';
import { useAccordionItemContext_unstable } from '../AccordionItem/index';
import { useARIAButton } from '@fluentui/react-aria';
import type { AccordionHeaderProps, AccordionHeaderState } from './AccordionHeader.types';
import { useContextSelector } from '@fluentui/react-context-selector';
import { AccordionContext } from '../Accordion/AccordionContext';
import { ChevronRightRegular } from '@fluentui/react-icons';
import { useFluent } from '@fluentui/react-shared-contexts';

/**
 * Returns the props and state required to render the component
 * @param props - AccordionHeader properties
 * @param ref - reference to root HTMLElement of AccordionHeader
 */
export const useAccordionHeader_unstable = (
  props: AccordionHeaderProps,
  ref: React.Ref<HTMLElement>,
): AccordionHeaderState => {
  const { as, icon, button, expandIcon, inline = false, size = 'medium', expandIconPosition = 'start' } = props;
  const { onHeaderClick: onAccordionHeaderClick, disabled, open } = useAccordionItemContext_unstable();

  /**
   * force disabled state on button if accordion isn't collapsible
   * and this is the only item opened
   */
  const disabledFocusable = useContextSelector(
    AccordionContext,
    ctx => !ctx.collapsible && ctx.openItems.length === 1 && open,
  );

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

  const buttonShorthand = useARIAButton(button, {
    required: true,
    defaultProps: {
      disabled,
      disabledFocusable,
      'aria-expanded': open,
    },
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
    root: getNativeElementProps(as || 'div', {
      ref,
      ...props,
    }),
    icon: resolveShorthand(icon),
    expandIcon: resolveShorthand(expandIcon, {
      required: true,
      defaultProps: {
        children: <ChevronRightRegular transform={`rotate(${expandIconRotation})`} />,
        'aria-hidden': true,
      },
    }),
    button: {
      ...buttonShorthand,
      onClick: useEventCallback(
        (ev: React.MouseEvent<HTMLButtonElement & HTMLDivElement & HTMLSpanElement & HTMLAnchorElement>) => {
          buttonShorthand.onClick?.(ev);
          if (!ev.defaultPrevented) {
            onAccordionHeaderClick(ev);
          }
        },
      ),
    },
  };
};
