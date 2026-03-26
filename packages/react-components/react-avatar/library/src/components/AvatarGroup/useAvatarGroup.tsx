import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type {
  AvatarGroupBaseProps,
  AvatarGroupBaseState,
  AvatarGroupProps,
  AvatarGroupState,
} from './AvatarGroup.types';

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
  const { size = defaultAvatarGroupSize, ...baseProps } = props;
  const state = useAvatarGroupBase_unstable(baseProps, ref as React.Ref<HTMLDivElement>);

  return {
    size,
    ...state,
  };
};

/**
 * Create the base state to render AvatarGroup, without design-specific props.
 *
 * @param props - props from this instance of AvatarGroup
 * @param ref - reference to root HTMLDivElement of AvatarGroup
 */
export const useAvatarGroupBase_unstable = (
  props: AvatarGroupBaseProps,
  ref: React.Ref<HTMLDivElement>,
): AvatarGroupBaseState => {
  const { layout = 'spread' } = props;

  const root = slot.always(
    getIntrinsicElementProps('div', {
      role: 'group',
      ...props,
      ref,
    }),
    { elementType: 'div' },
  );
  return { layout, components: { root: 'div' }, root };
};

export const defaultAvatarGroupSize = 32;
