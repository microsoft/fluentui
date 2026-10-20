'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TeachingPopoverTitleProps } from './TeachingPopoverTitle.types';
import { renderTeachingPopoverTitle } from './renderTeachingPopoverTitle';
import { useTeachingPopoverTitle } from './useTeachingPopoverTitle';
import { useTeachingPopoverTitleStyles } from './useTeachingPopoverTitleStyles.styles';

export const TeachingPopoverTitle: ForwardRefComponent<TeachingPopoverTitleProps> = React.forwardRef((props, ref) => {
  const state = useTeachingPopoverTitle(props, ref);
  useTeachingPopoverTitleStyles(state);
  return renderTeachingPopoverTitle(state);
});

TeachingPopoverTitle.displayName = 'TeachingPopoverTitle';
