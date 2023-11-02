import * as React from 'react';
import { useTeachingBubbleActions_unstable } from './useTeachingBubbleActions';
import { renderTeachingBubbleActions_unstable } from './renderTeachingBubbleActions';
import { useTeachingBubbleActionsStyles_unstable } from './useTeachingBubbleActionsStyles.styles';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { TeachingBubbleActionsProps } from './TeachingBubbleActions.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled TeachingBubbleActions, using the `useTeachingBubbleActions_unstable` and `useTeachingBubbleActionsStyles_unstable`
 * hooks.
 */
export const TeachingBubbleActions: ForwardRefComponent<TeachingBubbleActionsProps> = React.forwardRef((props, ref) => {
  const state = useTeachingBubbleActions_unstable(props, ref);

  useTeachingBubbleActionsStyles_unstable(state);

  useCustomStyleHook_unstable('useTeachingBubbleActionsStyles_unstable')(state);

  return renderTeachingBubbleActions_unstable(state);
});

TeachingBubbleActions.displayName = 'TeachingBubbleActions';
