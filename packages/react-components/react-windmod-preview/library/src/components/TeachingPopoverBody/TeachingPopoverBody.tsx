'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderTeachingPopoverBody,
  useTeachingPopoverBody,
} from '@fluentui/react-headless-components-preview/teaching-popover';

import type { TeachingPopoverBodyProps } from './TeachingPopoverBody.types';
import { useTeachingPopoverBodyStyles } from './useTeachingPopoverBodyStyles';

/**
 * The content column of a TeachingPopover, with an optional media slot above it. Windmod
 * TeachingPopoverBody: the headless body decorated with the Fluent visual contract. It takes no
 * look props — mediaLength is already resolved onto the headless state.
 */
export const TeachingPopoverBody: ForwardRefComponent<TeachingPopoverBodyProps> = React.forwardRef((props, ref) => {
  const state = useTeachingPopoverBody(props, ref);
  const styled = useTeachingPopoverBodyStyles(state);

  return renderTeachingPopoverBody(styled);
});

TeachingPopoverBody.displayName = 'TeachingPopoverBody';
