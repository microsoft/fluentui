import * as React from 'react';
import type {
  AccordionItemProps,
  AccordionItemState,
  AccordionItemSlots,
  RenderAccordionItem,
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
): [AccordionItemState, RenderAccordionItem] => {
  const state = useAccordionItemState(props, ref);

  const contextValues = useAccordionItemContextValues(state);

  useAccordionItemStyles(state);

  // TODO: Judgement tells me we shouldn't be doing logical work like
  //       assembling this renderer here in the useAccordionItem hook.
  //       The renderAccordionItem hook itself may be responsible for getting the context since it alone uses it?
  //       At the least, all logic should be contained within the hooks themselves, not outside.
  const render = React.useCallback(
    (accordionItemState: AccordionItemState) => {
      return renderAccordionItem(accordionItemState, contextValues);
    },
    [contextValues],
  );

  return [state, render];
};
