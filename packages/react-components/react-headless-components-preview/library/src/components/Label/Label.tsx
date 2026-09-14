'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { LabelProps } from './Label.types';
import { useLabel } from './useLabel';
import { renderLabel } from './renderLabel';

/**
 * A label component that associates text with form elements.
 */
export const Label: ForwardRefComponent<LabelProps> = React.forwardRef((props, ref) => {
  const state = useLabel(props, ref);

  return renderLabel(state);
});

Label.displayName = 'Label';
