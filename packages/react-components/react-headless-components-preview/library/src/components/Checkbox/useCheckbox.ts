'use client';

import type * as React from 'react';
import { useCheckboxBase_unstable } from '@fluentui/react-checkbox';
import type { CheckboxProps, CheckboxState } from './Checkbox.types';
import { stringifyDataAttribute } from '../../utils';

/**
 * Create the state required to render Checkbox.
 *
 * The returned state can be modified with hooks,
 * before being passed to renderCheckbox_unstable.
 *
 * @param props - props from this instance of Checkbox
 * @param ref - reference to root HTMLInputElement of Checkbox
 */
export const useCheckbox = (props: CheckboxProps, ref: React.Ref<HTMLInputElement>): CheckboxState => {
  'use no memo';

  const state: CheckboxState = useCheckboxBase_unstable(props, ref);

  // Set data attributes for disabled and checked states to simplify styling of these states.
  state.root['data-disabled'] = stringifyDataAttribute(state.disabled);
  state.root['data-checked'] = stringifyDataAttribute(state.checked);

  return state;
};
