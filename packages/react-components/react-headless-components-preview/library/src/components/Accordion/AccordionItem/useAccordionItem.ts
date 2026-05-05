'use client';

import type * as React from 'react';
import {
  useAccordionItem_unstable,
  useAccordionItemContext_unstable,
  useAccordionItemContextValues_unstable,
} from '@fluentui/react-accordion';

import type { AccordionItemProps, AccordionItemState, AccordionItemContextValues } from './AccordionItem.types';
import { stringifyDataAttribute } from '../../../utils';

/**
 * Returns the state for an AccordionItem component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderAccordionItem`.
 */
export const useAccordionItem = (props: AccordionItemProps, ref: React.Ref<HTMLElement>): AccordionItemState => {
  'use no memo';

  const state: AccordionItemState = useAccordionItem_unstable(props, ref);

  // Set data attributes for open and disabled states to simplify styling of these states.
  state.root['data-disabled'] = stringifyDataAttribute(state.disabled);
  state.root['data-open'] = stringifyDataAttribute(state.open);

  return state;
};

/**
 * Returns the context values provided by the nearest AccordionItem, enabling child components to read item-level state such as whether the item is open or disabled.
 */
export const useAccordionItemContext = useAccordionItemContext_unstable;

/**
 * Maps AccordionItem state to the context values passed down to child components.
 */
export const useAccordionItemContextValues = useAccordionItemContextValues_unstable as (
  state: AccordionItemState,
) => AccordionItemContextValues;
