'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TeachingPopoverBodyProps } from './TeachingPopoverBody.types';
import { useTeachingPopoverBody } from './useTeachingPopoverBody';
import { renderTeachingPopoverBody } from './renderTeachingPopoverBody';

export const TeachingPopoverBody: ForwardRefComponent<TeachingPopoverBodyProps> = React.forwardRef((props, ref) => {
  const state = useTeachingPopoverBody(props, ref);
  return renderTeachingPopoverBody(state);
});

TeachingPopoverBody.displayName = 'TeachingPopoverBody';
