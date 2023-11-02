import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { TeachingBubbleSurfaceProps } from './TeachingBubbleSurface.types';
import { useTeachingBubbleSurface_unstable } from './useTeachingBubbleSurface';
import { useTeachingBubbleSurfaceStyles_unstable } from './useTeachingBubbleSurfaceStyles.styles';
import { renderTeachingBubbleSurface_unstable } from './renderTeachingBubbleSurface';

/**
 * TeachingBubbleSurface component renders react children in a positioned box
 */
export const TeachingBubbleSurface: ForwardRefComponent<TeachingBubbleSurfaceProps> = React.forwardRef((props, ref) => {
  const state = useTeachingBubbleSurface_unstable(props, ref);

  useTeachingBubbleSurfaceStyles_unstable(state);

  useCustomStyleHook_unstable('useTeachingBubbleSurfaceStyles_unstable')(state);

  return renderTeachingBubbleSurface_unstable(state);
});

TeachingBubbleSurface.displayName = 'TeachingBubbleSurface';
