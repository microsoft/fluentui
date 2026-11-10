'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderInfoButton } from './renderInfoButton';
import { useInfoButton } from './useInfoButton';
import type { InfoButtonProps } from './InfoButton.types';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * InfoButtons provide a way to display additional information about a form field or an area in the UI.
 */
export const InfoButton: ForwardRefComponent<InfoButtonProps> = /*#__PURE__*/ composeComponent(
  'InfoButton',
  useInfoButton,
  renderInfoButton,
);
