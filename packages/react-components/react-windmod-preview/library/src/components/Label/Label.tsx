'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderLabel, useLabel } from '@fluentui/react-headless-components-preview/label';

import type { LabelProps } from './Label.types';
import { useLabelStyles } from './useLabelStyles';

/**
 * Labels give form elements an accessible, visible name. Windmod Label: the headless label
 * decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const Label: ForwardRefComponent<LabelProps> = React.forwardRef(
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-label's styled useLabel.
  ({ size = 'medium', weight = 'regular', ...rest }, ref) => {
    const state = useLabel(rest, ref);
    const styled = useLabelStyles({
      ...state,
      size,
      weight,
    });

    return renderLabel(styled);
  },
);

Label.displayName = 'Label';
