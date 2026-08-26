'use client';

import * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderDropdown,
  useDropdown,
  useDropdownContextValues,
} from '@fluentui/react-headless-components-preview/dropdown';
import { useFieldContext } from '@fluentui/react-headless-components-preview/field';
import { resolvePositioningShorthand } from '@fluentui/react-headless-components-preview/positioning';
import { ChevronDownRegular } from '@fluentui/react-icons/headless/svg/chevron-down';
import { DismissRegular } from '@fluentui/react-icons/headless/svg/dismiss';

import { Listbox } from '../Listbox';
import { mergeContextProps } from '../../utils/mergeContextProps';
import type { DropdownProps, DropdownState } from './Dropdown.types';
import { useDropdownStyles } from './useDropdownStyles';

/**
 * A Dropdown lets people choose an option from a list, with a button trigger. Windmod Dropdown: the
 * headless dropdown (native top layer + CSS anchor positioning) decorated with the Fluent visual
 * contract (Tailwind v4 + CSS Modules).
 */
export const Dropdown: ForwardRefComponent<DropdownProps> = React.forwardRef((props, ref) => {
  // Look props belong to windmod — the headless hook neither accepts nor resolves them. Defaults
  // mirror @fluentui/react-combobox's styled useDropdown, including its Field-context size fallback.
  // Only the look half of FieldContext is read here — its aria half is already applied by the
  // headless base hook via useFieldControlProps, so folding the whole value in would double-apply it.
  const {
    appearance = 'outline',
    size = 'medium',
    ...rest
  } = mergeContextProps({ size: useFieldContext()?.size }, props);

  // The six values react-combobox's useComboboxPositioning supplies and the headless layer drops,
  // restored verbatim with the consumer spread last — see Combobox.tsx, which calls the same helper.
  const base = useDropdown(
    {
      ...rest,
      positioning: {
        position: 'below',
        align: 'start',
        offset: { crossAxis: 0, mainAxis: 2 },
        fallbackPositions: ['above', 'after', 'after-top', 'before', 'before-top'],
        matchTargetSize: 'width',
        autoSize: true,
        ...resolvePositioningShorthand(rest.positioning),
      },
    },
    ref as React.Ref<HTMLButtonElement>,
  );

  // The listbox element type is re-stamped on the slot as well as in the components map, and the two
  // glyph slots take their Fluent defaults in a NEW state object rather than on the hook's own — see
  // Combobox.tsx for why each is required. Dropdown's clear affordance is a focusable button where
  // Combobox's is a decorative span, so the glyph lands on clearButton rather than clearIcon.
  const state: DropdownState = {
    ...base,
    appearance,
    size,
    // eslint-disable-next-line @typescript-eslint/no-deprecated -- reading base.components to keep every other slot's element type
    components: { ...base.components, listbox: Listbox },
    listbox: base.listbox && slot.optional({ ...base.listbox }, { elementType: Listbox, renderByDefault: true }),
    expandIcon: base.expandIcon && {
      ...base.expandIcon,
      children: base.expandIcon.children ?? <ChevronDownRegular />,
    },
    clearButton: base.clearButton && {
      ...base.clearButton,
      children: base.clearButton.children ?? <DismissRegular />,
    },
  };

  return renderDropdown(useDropdownStyles(state), useDropdownContextValues(state));
  // Casting is required due to lack of distributive union to support union on @types/react
}) as ForwardRefComponent<DropdownProps>;

Dropdown.displayName = 'Dropdown';
