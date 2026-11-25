'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { EmptySwatchProps } from './EmptySwatch.types';
import { useEmptySwatch } from './useEmptySwatch';
import { renderEmptySwatch } from './renderEmptySwatch';
import { composeComponent } from '../../../utils/composeComponent';

export const EmptySwatch: ForwardRefComponent<EmptySwatchProps> = /*#__PURE__*/ composeComponent(
  'EmptySwatch',
  useEmptySwatch,
  renderEmptySwatch,
);
