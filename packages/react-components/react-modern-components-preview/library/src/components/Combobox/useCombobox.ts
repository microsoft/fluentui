'use client';

import * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import {
  useCombobox as useComboboxBase,
  useComboboxContextValues,
  useComboboxFilter,
} from '@fluentui/react-headless-components-preview/combobox';
import { Listbox } from '../Dropdown/Listbox/Listbox';
import type { ComboboxProps, ComboboxState } from './Combobox.types';

export { useComboboxContextValues, useComboboxFilter };

export const useCombobox = (props: ComboboxProps, ref: React.Ref<HTMLInputElement>): ComboboxState => {
  const { appearance = 'outline', size = 'medium', ...rest } = props;
  const state = useComboboxBase(rest, ref);

  return {
    ...state,
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated -- headless state still uses components for compound slots.
      ...state.components,
      listbox: Listbox,
    },
    clearIcon: state.clearIcon && {
      ...state.clearIcon,
      children: state.clearIcon.children ?? React.createElement('span', { 'data-default-icon': '' }),
    },
    expandIcon: state.expandIcon && {
      ...state.expandIcon,
      children: state.expandIcon.children ?? React.createElement('span', { 'data-default-icon': '' }),
    },
    listbox: slot.optional(state.listbox, { elementType: Listbox }),
    root: {
      ...state.root,
      'data-appearance': appearance,
      'data-size': size,
    },
    appearance,
    size,
  };
};
