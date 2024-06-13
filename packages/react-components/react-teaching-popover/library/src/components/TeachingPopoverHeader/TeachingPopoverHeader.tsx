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
 *
 * TeachingPopoverHeader is an info subtitle located at the top of the popover, it provides a dismiss button by default (can be nulled)
 * and an info-tip icon that can be overridden or removed, subtitle displayed will be the children elements of TeachingPopoverHeader.
 */
export const TeachingPopoverHeader: ForwardRefComponent<TeachingPopoverHeaderProps> = React.forwardRef((props, ref) => {
  const state = useTeachingPopoverHeader_unstable(props, ref);

  useTeachingPopoverHeaderStyles_unstable(state);

  useCustomStyleHook_unstable('useTeachingPopoverHeaderStyles_unstable')(state);

  return renderTeachingPopoverHeader_unstable(state);
});

TeachingPopoverHeader.displayName = 'TeachingPopoverHeader';
