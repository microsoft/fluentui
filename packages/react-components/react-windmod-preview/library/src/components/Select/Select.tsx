'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderSelect, useSelect } from '@fluentui/react-headless-components-preview/select';
import { useFieldContext } from '@fluentui/react-headless-components-preview/field';
import { ChevronDownRegular } from '@fluentui/react-icons/headless/svg/chevron-down';

import { mergeContextProps } from '../../utils/mergeContextProps';
import type { SelectProps, SelectState } from './Select.types';
import { useSelectStyles } from './useSelectStyles';

/**
 * A Select lets people choose a single option from a list. Windmod Select: the headless select
 * decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const Select: ForwardRefComponent<SelectProps> = React.forwardRef((props, ref) => {
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-select's styled useSelect, including its Field-context size
  // fallback: `size = fieldContext?.size ?? 'medium'` (react-select useSelect.tsx:21, 25). Only
  // the look half of FieldContext is read here — its aria half is already applied by the headless
  // base hook via useFieldControlProps.
  // The overrides-context appearance fallback stays out: windmod ships no counterpart for it.
  const {
    appearance = 'outline',
    size = 'medium',
    ...rest
  } = mergeContextProps({ size: useFieldContext()?.size }, props);

  const state: SelectState = {
    ...useSelect(rest, ref),
    appearance,
    size,
  };

  // Unlike MenuButton's menuIcon, this slot renders by default, so no pre-hook materialisation is
  // needed here (see MenuButton.tsx for that case). Consumer-supplied children always win; null or
  // undefined children fall back to the chevron; `icon={null}` still removes the slot.
  const styled = useSelectStyles(
    state.icon ? { ...state, icon: { ...state.icon, children: state.icon.children ?? <ChevronDownRegular /> } } : state,
  );

  return renderSelect(styled);
  // Casting is required due to lack of distributive union to support union on @types/react
}) as ForwardRefComponent<SelectProps>;

Select.displayName = 'Select';
