import * as React from 'react';
import { useTeachingPopoverHeader_unstable } from './useTeachingPopoverHeader';
import { renderTeachingPopoverHeader_unstable } from './renderTeachingPopoverHeader';
import { useTeachingPopoverHeaderStyles_unstable } from './useTeachingPopoverHeaderStyles.styles';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { TeachingPopoverHeaderProps } from './TeachingPopoverHeader.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled TeachingPopoverHeader, using the `useTeachingPopoverHeader_unstable` and `useTeachingPopoverHeaderStyles_unstable`
 * hooks.
 */
export const TeachingPopoverHeader: ForwardRefComponent<TeachingPopoverHeaderProps> = React.forwardRef((props, ref) => {
  const state = useTeachingPopoverHeader_unstable(props, ref);

  useTeachingPopoverHeaderStyles_unstable(state);

  useCustomStyleHook_unstable('useTeachingPopoverHeaderStyles_unstable')(state);

  return renderTeachingPopoverHeader_unstable(state);
});

TeachingPopoverHeader.displayName = 'TeachingPopoverHeader';
