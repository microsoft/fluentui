import * as React from 'react';
import { useMergedRefs, useId, useDescendants, resolveShorthand, useEventCallback } from '@fluentui/react-utilities';
import { AccordionHeaderProps, AccordionHeaderState, AccordionHeaderSlots } from './AccordionHeader.types';
import {
  useAccordionItemContext,
  useAccordionItemDescendant,
  accordionItemDescendantContext,
  AccordionItemDescendant,
} from '../AccordionItem/index';
import { AccordionHeaderExpandIcon } from './AccordionHeaderExpandIcon';
import { useARIAButton } from '@fluentui/react-aria';

/**
 * Const listing which props are shorthand props.
 */
export const accordionHeaderShorthandProps: Array<keyof AccordionHeaderSlots> = [
  'icon',
  'button',
  'children',
  'expandIcon',
];

/**
 * Returns the props and state required to render the component
 * @param props - AccordionHeader properties
 * @param ref - reference to root HTMLElement of AccordionHeader
 * @param defaultProps - default values for the properties of AccordionHeader
 */
export const useAccordionHeader = (props: AccordionHeaderProps, ref: React.Ref<HTMLElement>): AccordionHeaderState => {
  const { onHeaderClick: onAccordionHeaderClick, disabled, open } = useAccordionItemContext();
  const id = useId('accordion-header-', props.id);
  const panel = useDescendants(accordionItemDescendantContext)[1] as AccordionItemDescendant | undefined;
  const innerRef = React.useRef<HTMLElement>(null);

  useAccordionItemDescendant(
    {
      element: innerRef.current,
      id,
    },
    0,
  );

  const buttonShorthand = useARIAButton(props.button, {
    id,
    disabled,
    'aria-controls': panel?.id,
    children: React.Fragment,
  });

  return {
    ...props,
    disabled,
    open,
    ref: useMergedRefs(ref, innerRef),
    size: props.size || 'medium',
    inline: props.inline || false,
    role: props.role || 'heading',
    expandIconPosition: props.expandIconPosition || 'start',
    components: {
      root: 'div',
      button: 'button',
      expandIcon: AccordionHeaderExpandIcon,
    },
    icon: resolveShorthand(props.icon),
    expandIcon: resolveShorthand(props.expandIcon, {
      'aria-hidden': true,
    }),
    button: {
      ...buttonShorthand,
      onClick: useEventCallback(ev => {
        buttonShorthand.onClick?.(ev);
        if (!ev.defaultPrevented) {
          onAccordionHeaderClick(ev);
        }
      }),
    },
    children: resolveShorthand(props.children),
  };
};
