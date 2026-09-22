'use client';

import * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import {
  useDropdown as useDropdownBase,
  useDropdownContextValues,
} from '@fluentui/react-headless-components-preview/dropdown';
import { Listbox } from '../Listbox/Listbox';
import type { DropdownProps, DropdownState } from './Dropdown.types';

export { useDropdownContextValues };

export const useDropdown = (props: DropdownProps, ref: React.Ref<HTMLButtonElement>): DropdownState => {
  const { appearance = 'outline', size = 'medium', ...rest } = props;
  const state = useDropdownBase(rest, ref);

  return {
    ...state,
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated -- headless state still uses components for compound slots.
      ...state.components,
      listbox: Listbox,
    },
    clearButton: state.clearButton && {
      ...state.clearButton,
      children: state.clearButton.children ?? React.createElement('span', { 'data-default-icon': '' }),
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
