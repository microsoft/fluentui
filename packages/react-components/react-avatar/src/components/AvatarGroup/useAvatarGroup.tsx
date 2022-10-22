import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { AvatarGroupProps, AvatarGroupState } from './AvatarGroup.types';

/**
 * Create the state required to render AvatarGroup.
 *
 * The returned state can be modified with hooks such as useAvatarGroupStyles_unstable,
 * before being passed to renderAvatarGroup_unstable.
 *
 * @param props - props from this instance of AvatarGroup
 * @param ref - reference to root HTMLElement of AvatarGroup
 */
export const useAvatarGroup_unstable = (props: AvatarGroupProps, ref: React.Ref<HTMLElement>): AvatarGroupState => {
  const { layout = 'spread', size = defaultAvatarGroupSize } = props;

  const root = getNativeElementProps(
    'div',
    {
      role: 'group',
      ...props,
      ref,
    },
    ['size'],
  );

  return {
    layout,
    size,
    components: {
      root: 'div',
    },
    root,
  };
};

export const defaultAvatarGroupSize = 32;
