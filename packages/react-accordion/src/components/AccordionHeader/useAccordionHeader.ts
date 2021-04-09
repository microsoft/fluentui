import * as React from 'react';
import {
  makeMergePropsCompat,
  resolveShorthandProps,
  useMergedRefs,
  useId,
  useDescendants,
  shouldPreventDefaultOnKeyDown,
} from '@fluentui/react-utilities';
import {
  AccordionHeaderExpandIconPosition,
  AccordionHeaderProps,
  AccordionHeaderSize,
  AccordionHeaderState,
  AccordionHeaderContextValue,
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

/**
 * Const listing which props are shorthand props.
 */
export const accordionHeaderShorthandProps = ['expandIcon', 'button', 'children', 'icon'] as const;

// eslint-disable-next-line deprecation/deprecation
const mergeProps = makeMergePropsCompat<AccordionHeaderState>({ deepMerge: accordionHeaderShorthandProps });

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
  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
      size: 'medium' as AccordionHeaderSize,
      inline: false,
      expandIcon: {
        as: DefaultExpandIcon,
        'aria-hidden': true,
      },
      button: {
        as: 'div',
        tabIndex: 0,
        role: 'button',
        children: React.Fragment,
        id,
        onClick: onAccordionHeaderClick,
        'aria-disabled': disabled,
        'aria-controls': panel?.id,
      },
      as: 'div',
      role: 'heading',
      expandIconPosition: 'start' as AccordionHeaderExpandIconPosition,
    },
    { button, icon, expandIconPosition, expandIcon, size, inline },
    defaultProps,
    resolveShorthandProps(props, accordionHeaderShorthandProps),
  );
  const originalButtonKeyDown = state.button.onKeyDown;
  state.button.onKeyDown = React.useCallback(
    (ev: React.KeyboardEvent<HTMLElement>) => {
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
    },
    [onAccordionHeaderClick, originalButtonKeyDown, disabled],
  );

  useAccordionItemDescendant(
    {
      element: state.ref.current,
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
