'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { DividerProps } from './Divider.types';
import { useDivider } from './useDivider';
import { renderDivider } from './renderDivider';
import { composeComponent } from '../../utils/composeComponent';

/**
 * Represents a divider between two elements. By default, the divider is horizontal, but it can be set to vertical by using the `vertical` prop.
 */
export const Divider: ForwardRefComponent<DividerProps> = /*#__PURE__*/ composeComponent(
  'Divider',
  useDivider,
  renderDivider,
);
