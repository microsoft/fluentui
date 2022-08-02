import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { AvatarGroupOverflowProps, AvatarGroupOverflowState } from './AvatarGroupOverflow.types';

/**
 * Create the state required to render AvatarGroupOverflow.
 *
 * The returned state can be modified with hooks such as useAvatarGroupOverflowStyles_unstable,
 * before being passed to renderAvatarGroupOverflow_unstable.
 *
 * @param props - props from this instance of AvatarGroupOverflow
 * @param ref - reference to root HTMLElement of AvatarGroupOverflow
 */
export const useAvatarGroupOverflow_unstable = (
  props: AvatarGroupOverflowProps,
  ref: React.Ref<HTMLElement>,
): AvatarGroupOverflowState => {
  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: 'div',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: getNativeElementProps('div', {
      ref,
      ...props,
    }),
  };
};
