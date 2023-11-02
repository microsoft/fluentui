import * as React from 'react';
import { useTeachingBubbleTitle_unstable } from './useTeachingBubbleTitle';
import { renderTeachingBubbleTitle_unstable } from './renderTeachingBubbleTitle';
import { useTeachingBubbleTitleStyles_unstable } from './useTeachingBubbleTitleStyles.styles';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { TeachingBubbleTitleProps } from './TeachingBubbleTitle.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled TeachingBubbleTitle, using the `useTeachingBubbleTitle_unstable` and `useTeachingBubbleTitleStyles_unstable`
 * hooks.
 */
export const TeachingBubbleTitle: ForwardRefComponent<TeachingBubbleTitleProps> = React.forwardRef((props, ref) => {
  const state = useTeachingBubbleTitle_unstable(props, ref);

  useTeachingBubbleTitleStyles_unstable(state);

  useCustomStyleHook_unstable('useTeachingBubbleTitleStyles_unstable')(state);

  return renderTeachingBubbleTitle_unstable(state);
});

TeachingBubbleTitle.displayName = 'TeachingBubbleTitle';
