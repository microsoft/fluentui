'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderOption, useOption } from '@fluentui/react-headless-components-preview/combobox';
import { CheckmarkFilled, Checkmark12Filled } from '@fluentui/react-icons/headless/svg/checkmark';

import type { OptionProps } from './Option.types';
import { useOptionStyles } from './useOptionStyles';

/** The multiselect-unselected glyph is the EMPTY STRING, not an icon: the outlined box the
 * multiselect check draws only reads as unselected while it holds nothing. */
const checkGlyph = (multiselect: boolean | undefined, selected: boolean): React.ReactNode => {
  if (!multiselect) {
    return <CheckmarkFilled />;
  }

  if (selected) {
    return <Checkmark12Filled />;
  }

  return '';
};

/**
 * An Option is one selectable row of a Listbox. Windmod Option: the headless option decorated with
 * the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const Option: ForwardRefComponent<OptionProps> = React.forwardRef((props, ref) => {
  const state = useOption(props, ref);

  // The headless surface ships no glyph; windmod restores the Fluent default in a new state
  // object, never on the one the hook returned. Consumer children always win.
  const styled = useOptionStyles(
    state.checkIcon
      ? {
          ...state,
          checkIcon: {
            ...state.checkIcon,
            children: state.checkIcon.children ?? checkGlyph(state.multiselect, state.selected),
          },
        }
      : state,
  );

  return renderOption(styled);
});

Option.displayName = 'Option';
