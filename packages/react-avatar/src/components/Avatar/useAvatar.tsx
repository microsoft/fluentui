import * as React from 'react';
import { resolveShorthand } from '@fluentui/react-utilities';
import { getInitials } from '../../utils/index';
import { AvatarProps, AvatarSizeValue, AvatarState } from './Avatar.types';
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
    color: 'neutral',
    activeDisplay: 'ring',
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

    // The icon will be resolved below if there is no label text
    icon: undefined,

    // If a string is provided for image, it is the img's src property rather than its children
    image: resolveShorthand(typeof props.image === 'string' ? { src: props.image } : props.image),

    // If a string is provided for badge, it is the PresenceBadge's status property rather than its children
    badge: resolveShorthand(typeof props.badge === 'string' ? { status: props.badge } : props.badge, {
      defaultProps: { size: getBadgeSize(size) },
    }),
  };

  // If a label was not provided, use the initials and fall back to the icon if initials aren't available
  if (!state.label?.children) {
    const initials = state.getInitials(state.name || '', dir === 'rtl');
    if (initials) {
      state.label = { ...state.label, children: initials };
    } else {
      let defaultIcon;
      if (size <= 24) {
        defaultIcon = <Person16Regular />;
      } else if (size <= 40) {
        defaultIcon = <Person20Regular />;
      } else if (size <= 48) {
        defaultIcon = <Person24Regular />;
      } else if (size <= 56) {
        defaultIcon = <Person28Regular />;
      } else if (size <= 72) {
        defaultIcon = <Person32Regular />;
      } else {
        defaultIcon = <Person48Regular />;
      }

      state.icon = resolveShorthand(props.icon, {
        required: true,
        defaultProps: { children: defaultIcon },
      });
    }
  }

  return state;
};

const getBadgeSize = (size: AvatarSizeValue) => {
  if (size >= 96) {
    return 'larger';
  } else if (size >= 64) {
    return 'large';
  } else if (size >= 56) {
    return 'medium';
  } else if (size >= 40) {
    return 'small';
  } else if (size >= 28) {
    return 'smaller';
  } else {
    return 'smallest';
  }
};
