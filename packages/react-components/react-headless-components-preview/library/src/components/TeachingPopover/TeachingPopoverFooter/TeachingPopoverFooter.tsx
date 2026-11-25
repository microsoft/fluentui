'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TeachingPopoverFooterProps } from './TeachingPopoverFooter.types';
import { useTeachingPopoverFooter } from './useTeachingPopoverFooter';
import { renderTeachingPopoverFooter } from './renderTeachingPopoverFooter';
import { composeComponent } from '../../../utils/composeComponent';

export const TeachingPopoverFooter: ForwardRefComponent<TeachingPopoverFooterProps> = /*#__PURE__*/ composeComponent(
  'TeachingPopoverFooter',
  useTeachingPopoverFooter,
  renderTeachingPopoverFooter,
);
