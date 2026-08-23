'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderCheckbox, useCheckbox } from '@fluentui/react-headless-components-preview/checkbox';
import { Checkmark12Filled, Checkmark16Filled } from '@fluentui/react-icons/headless/svg/checkmark';
import { CircleFilled } from '@fluentui/react-icons/headless/svg/circle';
import { Square12Filled, Square16Filled } from '@fluentui/react-icons/headless/svg/square';

import type { CheckboxProps, CheckboxShape, CheckboxSize, CheckboxState } from './Checkbox.types';
import { useCheckboxStyles } from './useCheckboxStyles';

// Not a hook: it is called on the right of `??`, where a `use` prefix would read as a
// conditionally-called hook.
const getIndicatorGlyph = (checked: 'mixed' | boolean, shape: CheckboxShape, size: CheckboxSize) => {
  if (checked === 'mixed') {
    if (shape === 'circular') {
      return <CircleFilled />;
    }

    return size === 'large' ? <Square16Filled /> : <Square12Filled />;
  }

  if (checked) {
    return size === 'large' ? <Checkmark16Filled /> : <Checkmark12Filled />;
  }

  return undefined;
};

/**
 * A Checkbox is a tri-state control for a single choice. Windmod Checkbox: the headless checkbox
 * decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const Checkbox: ForwardRefComponent<CheckboxProps> = React.forwardRef((props, ref) => {
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-checkbox's styled useCheckbox.
  const { shape = 'square', size = 'medium', ...rest } = props;

  const state: CheckboxState = {
    ...useCheckbox(rest, ref),
    shape,
    size,
  };

  // The indicator slot renders by default (see MenuButton.tsx for the D1 uniform glyph rule this
  // restoration follows), so no pre-hook materialisation is needed; `indicator={null}` still
  // removes the slot. The fallback value depends on the tri-state the hook resolved.
  const styled = useCheckboxStyles(
    state.indicator
      ? {
          ...state,
          indicator: {
            ...state.indicator,
            children: state.indicator.children ?? getIndicatorGlyph(state.checked, shape, size),
          },
        }
      : state,
  );

  return renderCheckbox(styled);
  // Casting is required due to lack of distributive union to support union on @types/react
}) as ForwardRefComponent<CheckboxProps>;

Checkbox.displayName = 'Checkbox';
