import * as React from 'react';
import { getNativeElementProps, resolveShorthand, useEventCallback } from '@fluentui/react-utilities';
import { useAccordionItemContext } from '../AccordionItem/index';
import { AccordionHeaderExpandIcon } from './AccordionHeaderExpandIcon';
import { useARIAButton } from '@fluentui/react-aria';
import type { AccordionHeaderProps, AccordionHeaderState, AccordionHeaderSlots } from './AccordionHeader.types';
import { useContextSelector } from '@fluentui/react-context-selector';
import { AccordionContext } from '../Accordion/AccordionContext';

/**
 * Const listing which props are shorthand props.
 */
export const accordionHeaderShorthandProps: Array<keyof AccordionHeaderSlots> = [
  'root',
  'icon',
  'button',
  'children',
  'expandIcon',
];

/**
 * Returns the props and state required to render the component
 * @param props - AccordionHeader properties
 * @param ref - reference to root HTMLElement of AccordionHeader
 */
export const useAccordionHeader = (props: AccordionHeaderProps, ref: React.Ref<HTMLElement>): AccordionHeaderState => {
  const { icon, button, children, expandIcon, inline = false, size = 'medium', expandIconPosition = 'start' } = props;
  const { onHeaderClick: onAccordionHeaderClick, disabled, open } = useAccordionItemContext();

  /**
   * force disabled state on button if accordion isn't collapsible
   * and this is the only item opened
   */
  const disabledFocusable = useContextSelector(
    AccordionContext,
    ctx => !ctx.collapsible && ctx.openItems.length === 1 && open,
  );

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
      expandIcon: AccordionHeaderExpandIcon,
      icon: 'div',
      children: 'div',
    },
    root: getNativeElementProps('div', {
      ref,
      role: 'heading',
      ...props,
    }),
    icon: resolveShorthand(icon),
    expandIcon: resolveShorthand(expandIcon, {
      required: true,
      defaultProps: {
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
    children: resolveShorthand(children as AccordionHeaderSlots['children'], {
      required: true,
    }),
  };
};
