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
      badge: PresenceBadge,
    },
    label: resolveShorthand(props.label),
    // The icon will be added later if there is no label text
    icon: undefined,
    // If a string is provided for badge, it is the PresenceBadge's status property rather than its children
    badge: resolveShorthand(typeof props.badge === 'string' ? { status: props.badge } : props.badge, {
      defaultProps: {
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
      },
    }),
    // If a string is provided for image, it is the img's src property rather than its children
    image: resolveShorthand(typeof props.image === 'string' ? { src: props.image } : props.image),
  };

  if (!state.label?.children) {
    // Default the label to the initials, if not provided
    const initials = state.getInitials(state.name ?? '', dir === 'rtl');
    if (initials) {
      state.label = { ...state.label, children: initials };
    } else {
      // If there is no label or initials, show the icon
      state.icon = resolveShorthand(props.icon, {
        required: true,
        defaultProps: {
          children:
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
            ),
        },
      });
    }
  }

  return state;
};
