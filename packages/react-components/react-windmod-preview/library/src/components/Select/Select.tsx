'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderSelect, useSelect } from '@fluentui/react-headless-components-preview/select';
import { ChevronDownRegular } from '@fluentui/react-icons/headless/svg/chevron-down';

import type { SelectProps, SelectState } from './Select.types';
import { useSelectStyles } from './useSelectStyles';

/**
 * A Select lets people choose a single option from a list. Windmod Select: the headless select
 * decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const Select: ForwardRefComponent<SelectProps> = React.forwardRef((props, ref) => {
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-select's styled useSelect, minus its Field-context and
  // overrides-context fallbacks, which windmod ships no counterpart for.
  const { appearance = 'outline', size = 'medium', ...rest } = props;

  const state: SelectState = {
    ...useSelect(rest, ref),
    appearance,
    size,
  };

  // Unlike MenuButton's menuIcon, this slot renders by default (see MenuButton.tsx for the D1
  // uniform glyph rule this restoration follows), so no pre-hook materialisation is needed here;
  // `icon={null}` still removes the slot.
  const styled = useSelectStyles(
    state.icon ? { ...state, icon: { ...state.icon, children: state.icon.children ?? <ChevronDownRegular /> } } : state,
  );

  return renderSelect(styled);
  // Casting is required due to lack of distributive union to support union on @types/react
}) as ForwardRefComponent<SelectProps>;

Select.displayName = 'Select';
