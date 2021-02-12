import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utils';
import { AvatarProps, AvatarState, defaultAvatarSize } from './Avatar.types';
import { useMergedRefs } from '@fluentui/react-hooks';
import { getInitials as defaultGetInitials, nullRender, assertNever } from '@fluentui/utilities';
import { Image } from '../Image/index';
import { ContactIcon as DefaultAvatarIcon } from '@fluentui/react-icons-mdl2';

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
    },
    defaultProps,
    resolveShorthandProps(props, avatarShorthandProps),
  );

  // Add in props used for styling
  if (state.active !== undefined) {
    const activeDisplay: AvatarProps['activeDisplay'] = state.activeDisplay;
    switch (activeDisplay) {
      case undefined:
      case 'ring':
        state.activeRing = true;
        break;
      case 'shadow':
        state.activeShadow = true;
        break;
      case 'glow':
        state.activeGlow = true;
        break;
      case 'ring-shadow':
        state.activeRing = true;
        state.activeShadow = true;
        break;
      case 'ring-glow':
        state.activeRing = true;
        state.activeGlow = true;
        break;
      default:
        assertNever(activeDisplay);
    }
  }

  // If a label was not provided, use the following priority:
  // icon => initials => default icon
  if (!state.label.children) {
    if (state.icon) {
      state.label.children = state.icon;
      state.hasIcon = true;
    } else {
      const initials = state.getInitials(state.name || '', /*isRtl: */ false);
      if (initials) {
        state.label.children = initials;
      } else {
        state.label.children = <DefaultAvatarIcon />;
        state.hasIcon = true;
      }
    }
  }

  return state;
};
