'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCombobox } from './useCombobox';
import { renderCombobox } from './renderCombobox';
import type { ComboboxProps } from './Combobox.types';
import { useComboboxContextValues } from './useComboboxContextValues';
import { composeComponent } from '../../utils/composeComponent';

export const Combobox: ForwardRefComponent<ComboboxProps> = /*#__PURE__*/ composeComponent(
  'Combobox',
  useCombobox,
  renderCombobox,
  useComboboxContextValues,
);
