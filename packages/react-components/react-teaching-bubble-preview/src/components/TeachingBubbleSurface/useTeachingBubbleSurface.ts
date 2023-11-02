import * as React from 'react';
import type { TeachingBubbleSurfaceProps, TeachingBubbleSurfaceState } from './TeachingBubbleSurface.types';
import { usePopoverSurface_unstable } from '@fluentui/react-popover';

/**
 * Create the state required to render TeachingBubbleSurface.
 *
 * The returned state can be modified with hooks such as useTeachingBubbleSurfaceStyles_unstable,
 * before being passed to renderTeachingBubbleSurface_unstable.
 *
 * @param props - props from this instance of TeachingBubbleSurface
 * @param ref - reference to root HTMLDivElement of TeachingBubbleSurface
 */
export const useTeachingBubbleSurface_unstable = (
  props: TeachingBubbleSurfaceProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingBubbleSurfaceState => {
  const state = usePopoverSurface_unstable(props, ref);

  return state;
};
