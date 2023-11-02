import * as React from 'react';
import { useTeachingBubbleHeader_unstable } from './useTeachingBubbleHeader';
import { renderTeachingBubbleHeader_unstable } from './renderTeachingBubbleHeader';
import { useTeachingBubbleHeaderStyles_unstable } from './useTeachingBubbleHeaderStyles.styles';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { TeachingBubbleHeaderProps } from './TeachingBubbleHeader.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled TeachingBubbleHeader, using the `useTeachingBubbleHeader_unstable` and `useTeachingBubbleHeaderStyles_unstable`
 * hooks.
 */
export const TeachingBubbleHeader: ForwardRefComponent<TeachingBubbleHeaderProps> = React.forwardRef((props, ref) => {
  const state = useTeachingBubbleHeader_unstable(props, ref);

  useTeachingBubbleHeaderStyles_unstable(state);

  useCustomStyleHook_unstable('useTeachingBubbleHeaderStyles_unstable')(state);

  return renderTeachingBubbleHeader_unstable(state);
});

TeachingBubbleHeader.displayName = 'TeachingBubbleHeader';
