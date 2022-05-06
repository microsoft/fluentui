import * as React from 'react';
import { useComboboxBase } from '../../utils/useComboboxBase';
import { ComboboxInput } from '../ComboboxInput/ComboboxInput';
import type { ComboboxProps, ComboboxState } from './Combobox.types';

/**
 * Create the state required to render Combobox.
 *
 * The returned state can be modified with hooks such as useComboboxStyles_unstable,
 * before being passed to renderCombobox_unstable.
 *
 * @param props - props from this instance of Combobox
 * @param ref - reference to root HTMLElement of Combobox
 */
export const useCombobox_unstable = (props: ComboboxProps, ref: React.Ref<HTMLButtonElement>): ComboboxState => {
  const state = useComboboxBase(props, ref);

  state.components.input = ComboboxInput;

  return state;
};
