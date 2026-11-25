'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ColorSwatchProps } from './ColorSwatch.types';
import { useColorSwatch } from './useColorSwatch';
import { renderColorSwatch } from './renderColorSwatch';
import { composeComponent } from '../../../utils/composeComponent';

export const ColorSwatch: ForwardRefComponent<ColorSwatchProps> = /*#__PURE__*/ composeComponent(
  'ColorSwatch',
  useColorSwatch,
  renderColorSwatch,
);
