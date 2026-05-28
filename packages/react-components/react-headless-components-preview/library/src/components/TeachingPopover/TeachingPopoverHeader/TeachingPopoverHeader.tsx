'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TeachingPopoverHeaderProps } from './TeachingPopoverHeader.types';
import { useTeachingPopoverHeader } from './useTeachingPopoverHeader';
import { renderTeachingPopoverHeader } from './renderTeachingPopoverHeader';

export const TeachingPopoverHeader: ForwardRefComponent<TeachingPopoverHeaderProps> = React.forwardRef((props, ref) => {
  const state = useTeachingPopoverHeader(props, ref);
  return renderTeachingPopoverHeader(state);
});

TeachingPopoverHeader.displayName = 'TeachingPopoverHeader';
