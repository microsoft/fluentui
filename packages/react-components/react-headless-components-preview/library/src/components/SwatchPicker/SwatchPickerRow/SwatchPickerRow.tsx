'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { SwatchPickerRowProps } from './SwatchPickerRow.types';
import { useSwatchPickerRow } from './useSwatchPickerRow';
import { renderSwatchPickerRow } from './renderSwatchPickerRow';
import { composeComponent } from '../../../utils/composeComponent';

export const SwatchPickerRow: ForwardRefComponent<SwatchPickerRowProps> = /*#__PURE__*/ composeComponent(
  'SwatchPickerRow',
  useSwatchPickerRow,
  renderSwatchPickerRow,
);
