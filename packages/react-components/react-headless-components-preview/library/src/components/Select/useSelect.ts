'use client';

import type * as React from 'react';
import { useSelectBase_unstable } from '@fluentui/react-select';
import type { SelectProps, SelectState } from './Select.types';
import { toDataAttributeValue } from '../../utils';

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
  const state: SelectState = useSelectBase_unstable(props, ref);

  // Set data attribute for disabled state to simplify styling.
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-disabled'] = toDataAttributeValue(state.select.disabled);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-invalid'] = toDataAttributeValue(state.select['aria-invalid']);

  return state;
};
