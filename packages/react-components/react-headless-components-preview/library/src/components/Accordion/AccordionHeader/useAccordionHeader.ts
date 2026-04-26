'use client';

import type * as React from 'react';
import {
  useAccordionHeaderBase_unstable,
  useAccordionHeaderContext_unstable,
  useAccordionHeaderContextValues_unstable,
} from '@fluentui/react-accordion';

import type { AccordionHeaderProps, AccordionHeaderState, AccordionHeaderContextValues } from './AccordionHeader.types';
import { stringifyDataAttribute } from '../../../utils';

/**
 * Returns the state for an AccordionHeader component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderAccordionHeader`.
 */
export const useAccordionHeader = (props: AccordionHeaderProps, ref: React.Ref<HTMLElement>): AccordionHeaderState => {
  'use no memo';

  const state: AccordionHeaderState = useAccordionHeaderBase_unstable(props, ref);

  // Set data attributes for open, disabled, and expand icon position states to simplify styling.
  state.root['data-open'] = stringifyDataAttribute(state.open);
  state.root['data-disabled'] = stringifyDataAttribute(state.disabled);
  state.root['data-expand-icon-position'] = state.expandIconPosition;

  return state;
};

/**
 * Returns the context values provided by the nearest AccordionHeader, enabling child components to read header-level state.
 */
export const useAccordionHeaderContext = useAccordionHeaderContext_unstable;

/**
 * Maps AccordionHeader state to the context values passed down to child components.
 */
export const useAccordionHeaderContextValues = useAccordionHeaderContextValues_unstable as (
  state: AccordionHeaderState,
) => AccordionHeaderContextValues;
