'use client';

import type * as React from 'react';
import { useSelectBase_unstable } from '@fluentui/react-select';
import type { SelectProps, SelectState } from './Select.types';
import { stringifyDataAttribute } from '../../utils';

/**
 * Create the state required to render Select.
 *
 * The returned state can be modified with hooks,
 * before being passed to renderSelect.
 *
 * @param props - props from this instance of Select
 * @param ref - reference to root HTMLSelectElement
 */
export const useSelect = (props: SelectProps, ref: React.Ref<HTMLSelectElement>): SelectState => {
  'use no memo';

  const state: SelectState = useSelectBase_unstable(props, ref);

  // Set data attribute for disabled state to simplify styling.
  state.root['data-disabled'] = stringifyDataAttribute(state.select.disabled);

  return state;
};
