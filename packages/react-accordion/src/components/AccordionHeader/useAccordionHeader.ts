import * as React from 'react';
import { useMergedRefs, useId, useDescendants, resolveShorthand } from '@fluentui/react-utilities';
import {
  AccordionHeaderProps,
  AccordionHeaderState,
  AccordionHeaderContextValue,
  AccordionHeaderSlots,
} from './AccordionHeader.types';
import {
  useAccordionItemContext,
  useAccordionItemDescendant,
  accordionItemDescendantContext,
  AccordionItemDescendant,
} from '../AccordionItem/index';
import { AccordionHeaderExpandIcon } from './AccordionHeaderExpandIcon';
import { AccordionContext } from '../Accordion/useAccordionContext';
import { useContextSelector } from '@fluentui/react-context-selector';
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
  const button = useContextSelector(AccordionContext, ctx => ctx.button);
  const expandIcon = useContextSelector(AccordionContext, ctx => ctx.expandIcon);
  const inline = useContextSelector(AccordionContext, ctx => ctx.inline);
  const icon = useContextSelector(AccordionContext, ctx => ctx.icon);
  const expandIconPosition = useContextSelector(AccordionContext, ctx => ctx.expandIconPosition);
  const size = useContextSelector(AccordionContext, ctx => ctx.size);
  const id = useId('accordion-header-', props.id);
  const panel = useDescendants(accordionItemDescendantContext)[1] as AccordionItemDescendant | undefined;
  const innerRef = React.useRef<HTMLElement>(null);
  const initialState = {
    ...props,
    ref: useMergedRefs(ref, innerRef),
    size: props.size ?? size ?? 'medium',
    inline: props.inline ?? inline ?? false,
    role: props.role ?? 'heading',
    expandIconPosition: props.expandIconPosition ?? expandIconPosition ?? 'start',
    components: {
      root: 'div',
      button: 'button',
      expandIcon: AccordionHeaderExpandIcon,
    },
    icon: resolveShorthand(props.icon ?? icon),
    expandIcon: resolveShorthand(props.expandIcon ?? expandIcon, {
      'aria-hidden': true,
    }),
    button: useARIAButton(props.button ?? button, {
      id,
      onClick: onAccordionHeaderClick,
      'aria-disabled': disabled,
      'aria-controls': panel?.id,
    }),
    children: resolveShorthand(props.children),
  } as const;

  useAccordionItemDescendant(
    {
      element: innerRef.current,
      id,
    },
    0,
  );

  return {
    ...initialState,
    context: React.useMemo<AccordionHeaderContextValue>(
      () => ({
        disabled,
        open,
        size: initialState.size,
        expandIconPosition: initialState.expandIconPosition,
      }),
      [open, initialState.size, initialState.expandIconPosition, disabled],
    ),
  };
};
