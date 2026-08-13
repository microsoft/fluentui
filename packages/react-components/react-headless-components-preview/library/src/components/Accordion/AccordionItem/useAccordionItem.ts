'use client';

import type * as React from 'react';
import { useAccordionItem_unstable } from '@fluentui/react-accordion';

import type { AccordionItemProps, AccordionItemState } from './AccordionItem.types';
import { stringifyDataAttribute } from '../../../utils';

/**
 * Returns the state for an AccordionItem component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderAccordionItem`.
 */
export const useAccordionItem = (props: AccordionItemProps, ref: React.Ref<HTMLElement>): AccordionItemState => {
  const state: AccordionItemState = useAccordionItem_unstable(props, ref);

  // Set data attributes for open and disabled states to simplify styling of these states.
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-disabled'] = stringifyDataAttribute(state.disabled);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-open'] = stringifyDataAttribute(state.open);

  return state;
};

/**
 * Returns the context values provided by the nearest AccordionItem, enabling child components to read item-level state such as whether the item is open or disabled.
 */
export {
  useAccordionItemContext_unstable as useAccordionItemContext,
  useAccordionItemContextValues_unstable as useAccordionItemContextValues,
} from '@fluentui/react-accordion';
