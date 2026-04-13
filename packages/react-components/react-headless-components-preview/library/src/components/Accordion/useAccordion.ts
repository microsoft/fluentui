'use client';

import type * as React from 'react';
import {
  useAccordionBase_unstable,
  useAccordionContext_unstable,
  useAccordionContextValues_unstable,
} from '@fluentui/react-accordion';

import type { AccordionProps, AccordionState, AccordionContextValues } from './Accordion.types';
import { stringifyDataAttribute } from '../../utils';

/**
 * Returns the state for an Accordion component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderAccordion`.
 */
export const useAccordion = (props: AccordionProps, ref: React.Ref<HTMLElement>): AccordionState => {
  const state = useAccordionBase_unstable(props, ref);

  Object.assign(state.root, {
    'data-collapsible': stringifyDataAttribute(state.collapsible),
    'data-multiple': stringifyDataAttribute(state.multiple),
  });

  return state;
};

/**
 * Returns the context of the accordion, which is used to pass information about the accordion to its children. This is used when a child component needs to know about the state of the accordion, such as whether it is collapsible or allows multiple items to be expanded.
 */
export const useAccordionContext = useAccordionContext_unstable;

/**
 * Maps the state of the accordion to the values that are passed through context to its children. This is used when a child component needs to know about the state of the accordion, such as whether it is collapsible or allows multiple items to be expanded.
 */
export const useAccordionContextValues = useAccordionContextValues_unstable as (
  state: AccordionState,
) => AccordionContextValues;
