'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TeachingPopoverHeaderProps } from './TeachingPopoverHeader.types';
import { useTeachingPopoverHeader } from './useTeachingPopoverHeader';
import { renderTeachingPopoverHeader } from './renderTeachingPopoverHeader';
import { composeComponent } from '../../../utils/composeComponent';

export const TeachingPopoverHeader: ForwardRefComponent<TeachingPopoverHeaderProps> = /*#__PURE__*/ composeComponent(
  'TeachingPopoverHeader',
  useTeachingPopoverHeader,
  renderTeachingPopoverHeader,
);
