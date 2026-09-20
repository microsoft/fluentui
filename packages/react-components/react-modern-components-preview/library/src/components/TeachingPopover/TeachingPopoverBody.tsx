'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TeachingPopoverBodyProps } from './TeachingPopoverBody.types';
import { renderTeachingPopoverBody } from './renderTeachingPopoverBody';
import { useTeachingPopoverBody } from './useTeachingPopoverBody';
import { useTeachingPopoverBodyStyles } from './useTeachingPopoverBodyStyles.styles';

export const TeachingPopoverBody: ForwardRefComponent<TeachingPopoverBodyProps> = React.forwardRef((props, ref) => {
  const state = useTeachingPopoverBody(props, ref);
  useTeachingPopoverBodyStyles(state);
  return renderTeachingPopoverBody(state);
});

TeachingPopoverBody.displayName = 'TeachingPopoverBody';
