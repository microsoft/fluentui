import * as React from 'react';
import type { TeachingPopoverSurfaceProps, TeachingPopoverSurfaceState } from './TeachingPopoverSurface.types';
import { usePopoverSurface_unstable } from '@fluentui/react-popover';

/**
 * Create the state required to render TeachingPopoverSurface.
 *
 * The returned state can be modified with hooks such as useTeachingPopoverSurfaceStyles_unstable,
 * before being passed to renderTeachingPopoverSurface_unstable.
 *
 * @param props - props from this instance of TeachingPopoverSurface
 * @param ref - reference to root HTMLDivElement of TeachingPopoverSurface
 */
export const useTeachingPopoverSurface_unstable = (
  props: TeachingPopoverSurfaceProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverSurfaceState => {
  const state = usePopoverSurface_unstable(props, ref);

  return state;
};
