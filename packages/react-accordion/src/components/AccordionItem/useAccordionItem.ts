import * as React from 'react';
import type {
  AccordionItemProps,
  AccordionItemState,
  AccordionItemSlots,
  RenderAccordionItem,
  AccordionItemContextValues,
} from './AccordionItem.types';
import { useAccordionItemState } from './useAccordionItemState';
import { useAccordionItemContextValues } from './useAccordionItemContextValues';
import { useAccordionItemStyles } from './useAccordionItemStyles';
import { renderAccordionItem } from './renderAccordionItem';

/**
 * Const listing which props are shorthand props.
 */
export const accordionItemShorthandProps: Array<keyof AccordionItemSlots> = ['root'];

/**
 * Returns the props and state required to render the component
 * @param props - AccordionItem properties
 * @param ref - reference to root HTMLElement of AccordionItem
 */
export const useAccordionItem = (
  props: AccordionItemProps,
  ref: React.Ref<HTMLElement>,
): [AccordionItemState, RenderAccordionItem, AccordionItemContextValues] => {
  const state = useAccordionItemState(props, ref);

  const contextValues = useAccordionItemContextValues(state);

  useAccordionItemStyles(state);

  return [state, renderAccordionItem, contextValues];
};
