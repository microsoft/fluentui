import * as React from 'react';
import { useTeachingPopoverBody_unstable } from './useTeachingPopoverBody';
import { renderTeachingPopoverBody_unstable } from './renderTeachingPopoverBody';
import { useTeachingPopoverBodyStyles_unstable } from './useTeachingPopoverBodyStyles.styles';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { TeachingPopoverBodyProps } from './TeachingPopoverBody.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled TeachingPopoverBody, using the `useTeachingPopoverBody_unstable` and `useTeachingPopoverBodyStyles_unstable`
 * hooks.
 *
 * TeachingPopoverBody is used to host content within a TeachingPopover, and provides a standardized media slot
 */
export const TeachingPopoverBody: ForwardRefComponent<TeachingPopoverBodyProps> = React.forwardRef((props, ref) => {
  const state = useTeachingPopoverBody_unstable(props, ref);

  useTeachingPopoverBodyStyles_unstable(state);

  useCustomStyleHook_unstable('useTeachingPopoverBodyStyles_unstable')(state);

  return renderTeachingPopoverBody_unstable(state);
});

TeachingPopoverBody.displayName = 'TeachingPopoverBody';
