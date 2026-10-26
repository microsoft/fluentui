'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ColorAreaProps } from './ColorArea.types';
import { useColorArea } from './useColorArea';
import { renderColorArea } from './renderColorArea';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * A two-dimensional headless control for selecting color saturation and value.
 */
export const ColorArea: ForwardRefComponent<ColorAreaProps> = /*#__PURE__*/ composeComponent(
  'ColorArea',
  useColorArea,
  renderColorArea,
);
