'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ColorAreaProps } from './ColorArea.types';
import { renderColorArea } from './renderColorArea';
import { useColorArea } from './useColorArea';
import { useColorAreaStyles } from './useColorAreaStyles.styles';

export const ColorArea: ForwardRefComponent<ColorAreaProps> = React.forwardRef((props, ref) => {
  const state = useColorArea(props, ref);
  useColorAreaStyles(state);
  return renderColorArea(state);
});

ColorArea.displayName = 'ColorArea';
