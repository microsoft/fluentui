'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { CompoundButtonProps } from './CompoundButton.types';
import { renderCompoundButton } from './renderCompoundButton';
import { useCompoundButton } from './useCompoundButton';
import { composeComponent } from '../../utils/composeComponent';

/**
 * A button with primary and secondary content. Concise primary and secondary text form its accessible name.
 */
export const CompoundButton: ForwardRefComponent<CompoundButtonProps> = /*#__PURE__*/ composeComponent(
  'CompoundButton',
  useCompoundButton,
  renderCompoundButton,
);
