'use client';

import type * as React from 'react';
import { useCheckboxBase_unstable } from '@fluentui/react-checkbox';
import type { CheckboxProps, CheckboxState } from './Checkbox.types';

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
  const state = useCheckboxBase_unstable(props, ref);

  return state;
};
