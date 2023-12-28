import * as React from 'react';
import { useTeachingPopoverTitle_unstable } from './useTeachingPopoverTitle';
import { renderTeachingPopoverTitle_unstable } from './renderTeachingPopoverTitle';
import { useTeachingPopoverTitleStyles_unstable } from './useTeachingPopoverTitleStyles.styles';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { TeachingPopoverTitleProps } from './TeachingPopoverTitle.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled TeachingPopoverTitle, using the `useTeachingPopoverTitle_unstable` and `useTeachingPopoverTitleStyles_unstable`
 * hooks.
 */
export const TeachingPopoverTitle: ForwardRefComponent<TeachingPopoverTitleProps> = React.forwardRef((props, ref) => {
  const state = useTeachingPopoverTitle_unstable(props, ref);

  useTeachingPopoverTitleStyles_unstable(state);

  useCustomStyleHook_unstable('useTeachingPopoverTitleStyles_unstable')(state);

  return renderTeachingPopoverTitle_unstable(state);
});

TeachingPopoverTitle.displayName = 'TeachingPopoverTitle';
