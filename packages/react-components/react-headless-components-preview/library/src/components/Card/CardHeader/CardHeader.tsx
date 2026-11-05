'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { CardHeaderProps } from './CardHeader.types';
import { useCardHeader } from './useCardHeader';
import { renderCardHeader } from './renderCardHeader';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * Component to render an image, text and an action in a Card component.
 */
export const CardHeader: ForwardRefComponent<CardHeaderProps> = /*#__PURE__*/ composeComponent(
  'CardHeader',
  useCardHeader,
  renderCardHeader,
);
