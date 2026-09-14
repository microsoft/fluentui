'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ColorAreaProps } from './ColorArea.types';
import { useColorArea } from './useColorArea';
import { renderColorArea } from './renderColorArea';

/**
 * A two-dimensional headless control for selecting color saturation and value.
 */
export const ColorArea: ForwardRefComponent<ColorAreaProps> = React.forwardRef((props, ref) => {
  const state = useColorArea(props, ref);

  return renderColorArea(state);
});

ColorArea.displayName = 'ColorArea';
