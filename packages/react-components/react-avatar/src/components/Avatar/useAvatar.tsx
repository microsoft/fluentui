import * as React from 'react';
import { getNativeElementProps, resolveShorthand, useId } from '@fluentui/react-utilities';
import { getInitials } from '../../utils/index';
import type { AvatarNamedColor, AvatarProps, AvatarState } from './Avatar.types';
import { PersonRegular } from '@fluentui/react-icons';
import { PresenceBadge } from '@fluentui/react-badge';
import { useFluent } from '@fluentui/react-shared-contexts';
import { useMergedEventCallbacks } from '@fluentui/react-utilities';

export const useAvatar_unstable = (props: AvatarProps, ref: React.Ref<HTMLElement>): AvatarState => {
  const { dir } = useFluent();
  const { name, size = 32, shape = 'circular', active = 'unset', activeAppearance = 'ring', idForColor } = props;
  let { color = 'neutral' } = props;

  // Resolve 'colorful' to a specific color name
  if (color === 'colorful') {
    color = avatarColors[getHashCode(idForColor ?? name ?? '') % avatarColors.length];
  }

  const baseId = useId('avatar-');

  const root: AvatarState['root'] = getNativeElementProps(
    'span',
    {
      role: 'img',
      id: baseId,
      // aria-label and/or aria-labelledby are resolved below
      ...props,
      ref,
    },
    /* excludedPropNames: */ ['name'],
  );

  // Resolve the initials slot, defaulted to getInitials.
  let initials: AvatarState['initials'] = resolveShorthand(props.initials, {
    required: true,
    defaultProps: {
      children: getInitials(name, dir === 'rtl', { firstInitialOnly: size <= 16 }),
      'aria-hidden': true,
    },
  });

  // Render the icon slot *only if* there aren't any initials to display.
  let icon: AvatarState['icon'] = undefined;
  if (!initials?.children) {
    initials = undefined;
    icon = resolveShorthand(props.icon, {
      required: true,
      defaultProps: {
        children: <PersonRegular />,
        'aria-hidden': true,
        id: baseId + '__initials',
      },
    });
  }

  const [imageHidden, setImageHidden] = React.useState<true | undefined>(undefined);
  const image: AvatarState['image'] = resolveShorthand(props.image, {
    defaultProps: {
      alt: '',
      role: 'presentation',
      'aria-hidden': true,
      hidden: imageHidden,
    },
  });

  // Hide the image if it fails to load and restore it on a successful load
  const imageOnError = useMergedEventCallbacks(image?.onError, () => setImageHidden(true));
  const imageOnLoad = useMergedEventCallbacks(image?.onLoad, () => setImageHidden(undefined));
  if (image) {
    image.onError = imageOnError;
    image.onLoad = imageOnLoad;
  }

  const badge: AvatarState['badge'] = resolveShorthand(props.badge, {
    defaultProps: {
      size: getBadgeSize(size),
      role: 'presentation',
      'aria-hidden': true,
      id: baseId + '__badge',
    },
  });

  // Resolve aria-label and/or aria-labelledby if not provided by the user
  if (!root['aria-label'] && !root['aria-labelledby']) {
    if (name) {
      root['aria-label'] = name;

      // Include the badge in labelledby if it exists
      if (badge) {
        root['aria-labelledby'] = root.id + ' ' + badge.id;
      }
    } else if (initials) {
      // root's aria-label should be the name, but fall back to being labelledby the initials if name is missing
      root['aria-labelledby'] = initials.id + (badge ? ' ' + badge.id : '');
    }
  }

  return {
    size,
    shape,
    active,
    activeAppearance,
    color,

    components: {
      root: 'span',
      initials: 'span',
      icon: 'span',
      image: 'img',
      badge: PresenceBadge,
    },

    root,
    initials,
    icon,
    image,
    badge,
  };
};

const getBadgeSize = (size: AvatarState['size']) => {
  if (size >= 96) {
    return 'extra-large';
  } else if (size >= 64) {
    return 'large';
  } else if (size >= 56) {
    return 'medium';
  } else if (size >= 40) {
    return 'small';
  } else if (size >= 28) {
    return 'extra-small';
  } else {
    return 'tiny';
  }
};

const avatarColors: AvatarNamedColor[] = [
  'darkRed',
  'cranberry',
  'red',
  'pumpkin',
  'peach',
  'marigold',
  'gold',
  'brass',
  'brown',
  'forest',
  'seafoam',
  'darkGreen',
  'lightTeal',
  'teal',
  'steel',
  'blue',
  'royalBlue',
  'cornflower',
  'navy',
  'lavender',
  'purple',
  'grape',
  'lilac',
  'pink',
  'magenta',
  'plum',
  'beige',
  'mink',
  'platinum',
  'anchor',
];

const getHashCode = (str: string): number => {
  let hashCode = 0;
  for (let len: number = str.length - 1; len >= 0; len--) {
    const ch = str.charCodeAt(len);
    const shift = len % 8;
    hashCode ^= (ch << shift) + (ch >> (8 - shift)); // eslint-disable-line no-bitwise
  }

  return hashCode;
};
