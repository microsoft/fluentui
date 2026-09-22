'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TeachingPopoverFooterProps } from './TeachingPopoverFooter.types';
import { renderTeachingPopoverFooter } from './renderTeachingPopoverFooter';
import { useTeachingPopoverFooter } from './useTeachingPopoverFooter';
import { useTeachingPopoverFooterStyles } from './useTeachingPopoverFooterStyles.styles';

export const TeachingPopoverFooter: ForwardRefComponent<TeachingPopoverFooterProps> = React.forwardRef((props, ref) => {
  const state = useTeachingPopoverFooter(props, ref);
  useTeachingPopoverFooterStyles(state);
  return renderTeachingPopoverFooter(state);
});

TeachingPopoverFooter.displayName = 'TeachingPopoverFooter';
