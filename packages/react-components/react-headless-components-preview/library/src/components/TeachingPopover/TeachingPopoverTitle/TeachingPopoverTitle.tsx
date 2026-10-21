'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TeachingPopoverTitleProps } from './TeachingPopoverTitle.types';
import { useTeachingPopoverTitle } from './useTeachingPopoverTitle';
import { renderTeachingPopoverTitle } from './renderTeachingPopoverTitle';
import { composeComponent } from '../../../utils/composeComponent';

export const TeachingPopoverTitle: ForwardRefComponent<TeachingPopoverTitleProps> = /*#__PURE__*/ composeComponent(
  'TeachingPopoverTitle',
  useTeachingPopoverTitle,
  renderTeachingPopoverTitle,
);
