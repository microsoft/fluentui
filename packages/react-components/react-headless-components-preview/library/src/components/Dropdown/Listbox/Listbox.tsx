'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';

import { useListbox } from './useListbox';
import { useListboxContextValues } from './useListboxContextValues';
import { renderListbox } from './renderListbox';
import type { ListboxProps } from './Listbox.types';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * Listbox component: a standalone selection control, or the popup in a Combobox.
 */
export const Listbox: ForwardRefComponent<ListboxProps> = /*#__PURE__*/ composeComponent(
  'Listbox',
  useListbox,
  renderListbox,
  useListboxContextValues,
);
