'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TeachingPopoverTitleProps } from './TeachingPopoverTitle.types';
import { useTeachingPopoverTitle } from './useTeachingPopoverTitle';
import { renderTeachingPopoverTitle } from './renderTeachingPopoverTitle';

export const TeachingPopoverTitle: ForwardRefComponent<TeachingPopoverTitleProps> = React.forwardRef((props, ref) => {
  const state = useTeachingPopoverTitle(props, ref);
  return renderTeachingPopoverTitle(state);
});

TeachingPopoverTitle.displayName = 'TeachingPopoverTitle';
