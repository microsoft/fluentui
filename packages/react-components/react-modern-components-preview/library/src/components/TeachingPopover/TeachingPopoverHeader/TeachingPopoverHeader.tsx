'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TeachingPopoverHeaderProps } from './TeachingPopoverHeader.types';
import { renderTeachingPopoverHeader } from './renderTeachingPopoverHeader';
import { useTeachingPopoverHeader } from './useTeachingPopoverHeader';
import { useTeachingPopoverHeaderStyles } from './useTeachingPopoverHeaderStyles.styles';

export const TeachingPopoverHeader: ForwardRefComponent<TeachingPopoverHeaderProps> = React.forwardRef((props, ref) => {
  const state = useTeachingPopoverHeader(props, ref);
  useTeachingPopoverHeaderStyles(state);
  return renderTeachingPopoverHeader(state);
});

TeachingPopoverHeader.displayName = 'TeachingPopoverHeader';
