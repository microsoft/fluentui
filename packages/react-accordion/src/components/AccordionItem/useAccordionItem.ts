import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import { useTabsterAttributes } from '@fluentui/react-tabster';
import { useContextSelector } from '@fluentui/react-context-selector';
import { AccordionContext } from '../Accordion/AccordionContext';
import type {
  AccordionItemProps,
  AccordionItemState,
  AccordionItemRender,
  AccordionItemContextValues,
} from './AccordionItem.types';
import type { AccordionToggleEvent } from '../Accordion/Accordion.types';
import { useAccordionItemContextValues_unstable } from './useAccordionItemContextValues';
import { renderAccordionItem_unstable } from './renderAccordionItem';

/**
 * Returns the props and state required to render the component
 * @param props - AccordionItem properties
 * @param ref - reference to root HTMLElement of AccordionItem
 */
export const useAccordionItem_unstable = (
  props: AccordionItemProps,
  ref: React.Ref<HTMLElement>,
): [AccordionItemState, AccordionItemRender, AccordionItemContextValues] => {
  const { value, disabled = false } = props;
  const navigable = useContextSelector(AccordionContext, ctx => ctx.navigable);
  const tabsterAttributes = useTabsterAttributes({
    groupper: {},
  });

  const requestToggle = useContextSelector(AccordionContext, ctx => ctx.requestToggle);
  const open = useContextSelector(AccordionContext, ctx => ctx.openItems.includes(value));
  const onAccordionHeaderClick = React.useCallback((ev: AccordionToggleEvent) => requestToggle(ev, { value }), [
    requestToggle,
    value,
  ]);

  const state: AccordionItemState = {
    open,
    value,
    disabled,
    onHeaderClick: onAccordionHeaderClick,
    components: {
      root: 'div',
    },
    root: getNativeElementProps('div', {
      ref: ref,
      ...(navigable ? tabsterAttributes : {}),
      ...props,
    }),
  };

  const contextValues = useAccordionItemContextValues_unstable(state);

  return [state, renderAccordionItem_unstable, contextValues];
};
