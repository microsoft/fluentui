'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ColorSwatchProps } from './ColorSwatch.types';
import { renderColorSwatch } from './renderColorSwatch';
import { useColorSwatch } from './useColorSwatch';
import { useColorSwatchStyles } from './useColorSwatchStyles.styles';

export const ColorSwatch: ForwardRefComponent<ColorSwatchProps> = React.forwardRef((props, ref) => {
  const state = useColorSwatch(props, ref);
  useColorSwatchStyles(state);
  return renderColorSwatch(state);
});

ColorSwatch.displayName = 'ColorSwatch';
