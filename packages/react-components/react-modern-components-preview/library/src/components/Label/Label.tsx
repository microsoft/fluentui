'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useLabel } from './useLabel';
import { renderLabel } from './renderLabel';
import { useLabelStyles } from './useLabelStyles.styles';
import type { LabelProps } from './Label.types';

/**
 * A label provides a name or title for an input.
 */
export const Label: ForwardRefComponent<LabelProps> = React.forwardRef<HTMLLabelElement, LabelProps>((props, ref) => {
  const state = useLabel(props, ref);

  useLabelStyles(state);

  return renderLabel(state);
});

Label.displayName = 'Label';
