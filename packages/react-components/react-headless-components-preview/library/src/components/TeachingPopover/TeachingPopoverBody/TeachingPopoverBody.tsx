'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TeachingPopoverBodyProps } from './TeachingPopoverBody.types';
import { useTeachingPopoverBody } from './useTeachingPopoverBody';
import { renderTeachingPopoverBody } from './renderTeachingPopoverBody';
import { composeComponent } from '../../../utils/composeComponent';

export const TeachingPopoverBody: ForwardRefComponent<TeachingPopoverBodyProps> = /*#__PURE__*/ composeComponent(
  'TeachingPopoverBody',
  useTeachingPopoverBody,
  renderTeachingPopoverBody,
);
