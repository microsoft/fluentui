import * as React from 'react';
import { renderTeachingBubbleButton_unstable } from './renderTeachingBubbleButton';
import { useTeachingBubbleButton_unstable } from './useTeachingBubbleButton';
import { useTeachingBubbleButtonStyles_unstable } from './useTeachingBubbleButtonStyles.styles';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TeachingBubbleButtonProps } from './TeachingBubbleButton.types';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * TeachingBubbleButtons override style and functionality based on carousel/popover state.
 */
export const TeachingBubbleButton: ForwardRefComponent<TeachingBubbleButtonProps> = React.forwardRef((props, ref) => {
  const state = useTeachingBubbleButton_unstable(props, ref);

  useTeachingBubbleButtonStyles_unstable(state);

  useCustomStyleHook_unstable('useTeachingBubbleButtonStyles_unstable')(state);

  return renderTeachingBubbleButton_unstable(state);
  // Casting is required due to lack of distributive union to support unions on @types/react
}) as ForwardRefComponent<TeachingBubbleButtonProps>;

TeachingBubbleButton.displayName = 'TeachingBubbleButton';
