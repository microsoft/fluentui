import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { TeachingPopoverSurfaceProps, TeachingPopoverSurfaceState } from './TeachingPopoverSurface.types';

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
  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: 'div',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
};
