import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, useMergedRefs, useId, useDescendants } from '@fluentui/react-utilities';
import {
  AccordionHeaderExpandIconPosition,
  AccordionHeaderProps,
  AccordionHeaderSize,
  AccordionHeaderState,
} from './AccordionHeader.types';
import {
  useAccordionItemContext,
  useAccordionItemDescendant,
  accordionItemDescendantContext,
  AccordionItemDescendant,
} from '../AccordionItem/index';
import { DefaultExpandIcon } from './DefaultExpandIcon';
import { accordionContext } from '../Accordion/useAccordionContext';
import { useContextSelector } from '@fluentui/react-context-selector';

/**
 * Consts listing which props are shorthand props.
 */
export const accordionHeaderShorthandProps = ['expandIcon', 'button', 'children'];

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
  const { onHeaderClick: onAccordionHeaderClick, open } = useAccordionItemContext();
  const button = useContextSelector(accordionContext, ctx => ctx.button);
  const expandIcon = useContextSelector(accordionContext, ctx => ctx.expandIcon);
  const expandIconPosition = useContextSelector(accordionContext, ctx => ctx.expandIconPosition);
  const size = useContextSelector(accordionContext, ctx => ctx.size);
  const id = useId('accordion-header-', props.id);
  const panel = useDescendants(accordionItemDescendantContext)[1] as AccordionItemDescendant | undefined;
  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
      size: 'medium' as AccordionHeaderSize,
      expandIcon: {
        as: DefaultExpandIcon,
        open,
        'aria-hidden': true,
      },
      button: {
        as: 'div',
        tabIndex: 0,
        role: 'button',
        children: React.Fragment,
        id,
        onClick: onAccordionHeaderClick,
        'aria-controls': panel?.id,
      },
      as: 'div',
      role: 'heading',
      expandIconPosition: 'start' as AccordionHeaderExpandIconPosition,
    },
    { button, expandIconPosition, expandIcon, size },
    defaultProps,
    resolveShorthandProps(props, accordionHeaderShorthandProps),
  );
  if (state.expandIcon) {
    state.expandIcon.expandIconPosition = state.expandIconPosition;
  }
  useAccordionItemDescendant(
    {
      element: state.ref.current,
      id,
    },
    0,
  );
  return state;
};
