import * as React from 'react';
import {
  makeMergeProps,
  resolveShorthandProps,
  useMergedRefs,
  useId,
  useDescendants,
  shouldPreventDefaultOnKeyDown,
  useEventCallback,
} from '@fluentui/react-utilities';
import {
  AccordionHeaderProps,
  AccordionHeaderSize,
  AccordionHeaderState,
  AccordionHeaderContextValue,
  AccordionHeaderShorthandProps,
} from './AccordionHeader.types';
import {
  useAccordionItemContext,
  useAccordionItemDescendant,
  accordionItemDescendantContext,
  AccordionItemDescendant,
} from '../AccordionItem/index';
import { DefaultExpandIcon } from './DefaultExpandIcon';
import { AccordionContext } from '../Accordion/useAccordionContext';
import { useContextSelector } from '@fluentui/react-context-selector';
import { useARIAButton } from '@fluentui/react-aria';

/**
 * Const listing which props are shorthand props.
 */
export const accordionHeaderShorthandProps: AccordionHeaderShorthandProps[] = [
  'expandIcon',
  'button',
  'children',
  'icon',
];

const mergeProps = makeMergeProps<AccordionHeaderState>({ deepMerge: accordionHeaderShorthandProps });

/**
 * Returns the props and state required to render the component
 * @param props - AccordionHeader properties
 * @param ref - reference to root HTMLElement of AccordionHeader
 * @param defaultProps - default values for the properties of AccordionHeader
 */
export const useAccordionHeader = (
  props: AccordionHeaderProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: AccordionHeaderProps,
): AccordionHeaderState => {
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
  const state = mergeProps(
    {
      ref: useMergedRefs(ref, innerRef),
      size: 'medium' as AccordionHeaderSize,
      inline: false,
      expandIcon: {
        as: DefaultExpandIcon,
        'aria-hidden': true,
      },
      button: {
        id,
        onClick: onAccordionHeaderClick,
        'aria-disabled': disabled,
        'aria-controls': panel?.id,
      },
      as: 'div',
      role: 'heading',
      expandIconPosition: 'start',
      context: {
        disabled: false,
        open: false,
        size: 'medium',
        expandIconPosition: 'start',
      },
    },
    resolveShorthandProps<AccordionHeaderProps, AccordionHeaderShorthandProps>(
      { button, icon, expandIconPosition, expandIcon, size, inline },
      accordionHeaderShorthandProps,
    ),
    defaultProps && resolveShorthandProps(defaultProps, accordionHeaderShorthandProps),
    resolveShorthandProps(props, accordionHeaderShorthandProps),
  );
  const originalButtonKeyDown = state.button.onKeyDown;
  state.button.onKeyDown = useEventCallback((ev: React.KeyboardEvent<HTMLElement>) => {
    if (shouldPreventDefaultOnKeyDown(ev)) {
      if (disabled) {
        ev.preventDefault();
        ev.stopPropagation();
        return;
      }
      ev.preventDefault();
      onAccordionHeaderClick(ev);
    }
    originalButtonKeyDown?.(ev);
  });

  useARIAButton(state.button);

  useAccordionItemDescendant(
    {
      element: innerRef.current,
      id,
    },
    0,
  );
  state.context = React.useMemo<AccordionHeaderContextValue>(
    () => ({
      disabled,
      open,
      size: state.size,
      expandIconPosition: state.expandIconPosition,
    }),
    [open, state.size, state.expandIconPosition, disabled],
  );
  return state;
};
