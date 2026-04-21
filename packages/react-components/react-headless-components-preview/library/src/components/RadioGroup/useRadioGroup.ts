'use client';

import type * as React from 'react';
import { useRadioGroupBase_unstable } from '@fluentui/react-radio';

import type { RadioGroupProps, RadioGroupState } from './RadioGroup.types';

/**
 * Returns the state for a RadioGroup component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderRadioGroup`.
 */
export const useRadioGroup = (props: RadioGroupProps, ref: React.Ref<HTMLDivElement>): RadioGroupState => {
  const state: RadioGroupState = useRadioGroupBase_unstable(props, ref);

  // Defines the element focus behavior for the radio group.
  state.root.focusgroup = 'radiogroup';

  return state;
};
