import * as React from 'react';
import { resolveShorthand } from '@fluentui/react-utilities';
import { getInitials } from '../../utils/index';
import { AvatarProps, AvatarState } from './Avatar.types';
import {
  Person16Regular,
  Person20Regular,
  Person24Regular,
  Person28Regular,
  Person32Regular,
  Person48Regular,
} from '@fluentui/react-icons';
import { PresenceBadge } from '@fluentui/react-badge';
import { useFluent } from '@fluentui/react-shared-contexts';

export const useAvatar = (props: AvatarProps, ref: React.Ref<HTMLElement>): AvatarState => {
  const { dir } = useFluent();
  const { size = 32 } = props;

  // Avatar treats shorthand for the image and badge props differently. Rather than the string being
  // the child of those slots, they translate to the image's src and the badge's status prop.
  let { image, badge } = props;
  if (typeof image === 'string') {
    image = { src: image, children: null }; // TODO replace `children: null` with `optional: false` when available
  }
  if (typeof badge === 'string') {
    badge = { status: badge };
  }

  const state: AvatarState = {
    size,
    activeDisplay: 'ring',
    color: 'neutral',
    getInitials,

    ref,
    ...props,

    components: {
      root: 'span',
      label: 'span',
      icon: 'span',
      image: 'img',
      badge: props.badge ? PresenceBadge : () => null,
    },
    label: resolveShorthand(props.label),
    icon: resolveShorthand(props.icon),
    badge: resolveShorthand(badge, {
      size:
        size <= 24
          ? 'smallest'
          : size <= 28
          ? 'smaller'
          : size <= 52
          ? 'small'
          : size <= 72
          ? 'medium'
          : size <= 96
          ? 'large'
          : 'larger',
    }),
    image: resolveShorthand(image),
  };

  if (!state.label.children) {
    state.label.children = state.getInitials(state.name ?? '', dir === 'rtl');
  }

  if (!state.label.children && !state.icon.children) {
    state.icon.children =
      size <= 24 ? (
        <Person16Regular />
      ) : size <= 40 ? (
        <Person20Regular />
      ) : size <= 48 ? (
        <Person24Regular />
      ) : size <= 56 ? (
        <Person28Regular />
      ) : size <= 72 ? (
        <Person32Regular />
      ) : (
        <Person48Regular />
      );
  }

  return state;
};
