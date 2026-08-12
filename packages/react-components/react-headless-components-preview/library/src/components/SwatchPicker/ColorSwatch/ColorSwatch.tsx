'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ColorSwatchProps } from './ColorSwatch.types';
import { useColorSwatch } from './useColorSwatch';
import { renderColorSwatch } from './renderColorSwatch';

export const ColorSwatch: ForwardRefComponent<ColorSwatchProps> = React.forwardRef((props, ref) => {
  const state = useColorSwatch(props, ref);
  return renderColorSwatch(state);
});

ColorSwatch.displayName = 'ColorSwatch';
