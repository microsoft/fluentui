'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TeachingPopoverSurfaceProps } from './TeachingPopoverSurface.types';
import { useTeachingPopoverSurface } from './useTeachingPopoverSurface';
import { renderTeachingPopoverSurface } from './renderTeachingPopoverSurface';
import { composeComponent } from '../../../utils/composeComponent';

export const TeachingPopoverSurface: ForwardRefComponent<TeachingPopoverSurfaceProps> = /*#__PURE__*/ composeComponent(
  'TeachingPopoverSurface',
  useTeachingPopoverSurface,
  renderTeachingPopoverSurface,
);
