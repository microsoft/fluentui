'use client';

import * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderCombobox,
  useCombobox,
  useComboboxContextValues,
} from '@fluentui/react-headless-components-preview/combobox';
import { useFieldContext } from '@fluentui/react-headless-components-preview/field';
import { resolvePositioningShorthand } from '@fluentui/react-headless-components-preview/positioning';
import { ChevronDownRegular } from '@fluentui/react-icons/headless/svg/chevron-down';
import { DismissRegular } from '@fluentui/react-icons/headless/svg/dismiss';

import { Listbox } from '../Listbox';
import { mergeContextProps } from '../../utils/mergeContextProps';
import type { ComboboxProps, ComboboxState } from './Combobox.types';
import { useComboboxStyles } from './useComboboxStyles';

/**
 * A Combobox lets people choose an option from a list, with a text input trigger. Windmod Combobox:
 * the headless combobox (native top layer + CSS anchor positioning) decorated with the Fluent visual
 * contract (Tailwind v4 + CSS Modules).
 */
export const Combobox: ForwardRefComponent<ComboboxProps> = React.forwardRef((props, ref) => {
  // Look props belong to windmod — the headless hook neither accepts nor resolves them. Defaults
  // mirror @fluentui/react-combobox's styled useCombobox, including its Field-context size fallback.
  // Only the look half of FieldContext is read here — its aria half is already applied by the
  // headless base hook via useFieldControlProps, so folding the whole value in would double-apply it.
  const {
    appearance = 'outline',
    size = 'medium',
    ...rest
  } = mergeContextProps({ size: useFieldContext()?.size }, props);

  // Griffel parity: the headless layer passes usePositioning nothing, so its own above-centre,
  // fit-content defaults take over. These five values decide where and how large the surface renders,
  // and are spelled exactly as react-combobox's useComboboxPositioning spells them — including the
  // consumer spread last, so a consumer's positioning still wins. react-combobox's sixth value,
  // `autoSize: true`, has no headless counterpart: nothing in usePositioning reads it, so the
  // listbox is not clamped to the space below the trigger the way floating-ui clamps Griffel's.
  const base = useCombobox(
    {
      ...rest,
      positioning: {
        position: 'below',
        align: 'start',
        offset: { crossAxis: 0, mainAxis: 2 },
        fallbackPositions: ['above', 'after', 'after-top', 'before', 'before-top'],
        matchTargetSize: 'width',
        ...resolvePositioningShorthand(rest.positioning),
      },
    },
    ref as React.Ref<HTMLInputElement>,
  );

  // The headless components map points the listbox slot at the headless Listbox; Griffel points it
  // at its own styled one. assertSlots reconciles components against the slot's element type only
  // outside production, so the element type is re-stamped on the slot, not just in the map. The
  // already-resolved slot is passed back as the shorthand so nothing is merged a second time.
  //
  // The headless surface ships no glyphs; windmod restores the Fluent defaults in a new state
  // object, never on the one the hook returned. Consumer children always win.
  const state: ComboboxState = {
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
    clearIcon: base.clearIcon && {
      ...base.clearIcon,
      children: base.clearIcon.children ?? <DismissRegular />,
    },
  };

  return renderCombobox(useComboboxStyles(state), useComboboxContextValues(state));
  // Casting is required due to lack of distributive union to support union on @types/react
}) as ForwardRefComponent<ComboboxProps>;

Combobox.displayName = 'Combobox';
