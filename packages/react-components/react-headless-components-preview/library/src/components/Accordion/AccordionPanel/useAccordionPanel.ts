'use client';

import type * as React from 'react';
import { useAccordionPanelBase_unstable } from '@fluentui/react-accordion';

import type { AccordionPanelProps, AccordionPanelState } from './AccordionPanel.types';
import { stringifyDataAttribute } from '../../../utils';

/**
 * Returns the state for an AccordionPanel component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderAccordionPanel`.
 */
export const useAccordionPanel = (props: AccordionPanelProps, ref: React.Ref<HTMLElement>): AccordionPanelState => {
  'use no memo';

  const state: AccordionPanelState = useAccordionPanelBase_unstable(props, ref);

  // Set data attribute for open state to simplify styling.
  state.root['data-open'] = stringifyDataAttribute(state.open);

  return state;
};
