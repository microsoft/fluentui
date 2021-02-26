import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, useMergedRefs } from '@fluentui/react-utilities';
import { AvatarDefaults, AvatarProps, AvatarState, defaultAvatarSize } from './Avatar.types';
import { getInitials as defaultGetInitials, nullRender } from '@fluentui/utilities';
import { Image } from '../Image/index';
import { DefaultAvatarIcon } from './DefaultAvatarIcon';

export const avatarShorthandProps: (keyof AvatarProps)[] = ['label', 'image', 'badge'];

const mergeProps = makeMergeProps<AvatarState>({ deepMerge: avatarShorthandProps });

export const useAvatar = (props: AvatarProps, ref: React.Ref<HTMLElement>, defaultProps?: AvatarProps): AvatarState => {
  const state = mergeProps(
    {
      as: 'span',
      label: { as: 'span' },
      image: { as: props.image ? Image : nullRender },
      badge: { as: nullRender },
      size: defaultAvatarSize,
      getInitials: defaultGetInitials,
      ref: useMergedRefs(ref, React.useRef(null)),
    } as AvatarDefaults,
    defaultProps,
    resolveShorthandProps(props, avatarShorthandProps),
  );

  // If a label was not provided, use the following priority:
  // icon => initials => default icon
  if (!state.label.children) {
    if (state.icon) {
      state.label.children = state.icon;
    } else {
      const initials = state.getInitials(state.name || '', /*isRtl: */ false);
      if (initials) {
        state.label.children = initials;
      } else {
        // useAvatarStyles expects state.icon to be set if displaying an icon
        state.label.children = state.icon = <DefaultAvatarIcon />;
      }
    }
  }

  return state;
};
