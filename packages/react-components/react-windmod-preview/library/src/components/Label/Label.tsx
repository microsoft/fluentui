'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderLabel, useLabel } from '@fluentui/react-headless-components-preview/label';

import type { LabelProps, LabelState } from './Label.types';
import { useLabelStyles } from './useLabelStyles';

/**
 * Labels give form elements an accessible, visible name. Windmod Label: the headless label
 * decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const Label: ForwardRefComponent<LabelProps> = React.forwardRef((props, ref) => {
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-label's styled useLabel.
  const { size = 'medium', weight = 'regular', ...rest } = props;

  const state: LabelState = {
    ...useLabel(rest, ref),
    size,
    weight,
  };

  return renderLabel(useLabelStyles(state));
  // Casting is required due to lack of distributive union to support union on @types/react
}) as ForwardRefComponent<LabelProps>;

Label.displayName = 'Label';
