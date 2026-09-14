'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TeachingPopoverFooterProps } from './TeachingPopoverFooter.types';
import { useTeachingPopoverFooter } from './useTeachingPopoverFooter';
import { renderTeachingPopoverFooter } from './renderTeachingPopoverFooter';

export const TeachingPopoverFooter: ForwardRefComponent<TeachingPopoverFooterProps> = React.forwardRef((props, ref) => {
  const state = useTeachingPopoverFooter(props, ref);
  return renderTeachingPopoverFooter(state);
});

TeachingPopoverFooter.displayName = 'TeachingPopoverFooter';
