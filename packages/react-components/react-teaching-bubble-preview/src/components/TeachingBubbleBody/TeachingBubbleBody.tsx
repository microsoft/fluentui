import * as React from 'react';
import { useTeachingBubbleBody_unstable } from './useTeachingBubbleBody';
import { renderTeachingBubbleBody_unstable } from './renderTeachingBubbleBody';
import { useTeachingBubbleBodyStyles_unstable } from './useTeachingBubbleBodyStyles.styles';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { TeachingBubbleBodyProps } from './TeachingBubbleBody.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled TeachingBubbleBody, using the `useTeachingBubbleBody_unstable` and `useTeachingBubbleBodyStyles_unstable`
 * hooks.
 */
export const TeachingBubbleBody: ForwardRefComponent<TeachingBubbleBodyProps> = React.forwardRef((props, ref) => {
  const state = useTeachingBubbleBody_unstable(props, ref);

  useTeachingBubbleBodyStyles_unstable(state);

  useCustomStyleHook_unstable('useTeachingBubbleBodyStyles_unstable')(state);

  return renderTeachingBubbleBody_unstable(state);
});

TeachingBubbleBody.displayName = 'TeachingBubbleBody';
