import * as React from 'react';
import { getIntrinsicElementProps, mergeCallbacks, useId, slot } from '@fluentui/react-utilities';
import { getInitials } from '../../utils/index';
import type { AvatarNamedColor, AvatarProps, AvatarState } from './Avatar.types';
import { PersonRegular } from '@fluentui/react-icons';
import { PresenceBadge } from '@fluentui/react-badge';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { useAvatarContext } from '../../contexts/AvatarContext';

export const DEFAULT_STRINGS = {
  active: 'active',
  inactive: 'inactive',
};

export const useAvatar_unstable = (props: AvatarProps, ref: React.Ref<HTMLElement>): AvatarState => {
  const { dir } = useFluent();
  const { shape: contextShape, size: contextSize } = useAvatarContext();
  const {
    name,
    size = contextSize ?? (32 as const),
    shape = contextShape ?? 'circular',
    active = 'unset',
    activeAppearance = 'ring',
    idForColor,
  } = props;
  let { color = 'neutral' } = props;

  // Resolve 'colorful' to a specific color name
  if (color === 'colorful') {
    color = avatarColors[getHashCode(idForColor ?? name ?? '') % avatarColors.length];
  }

  const baseId = useId('avatar-');

  const root: AvatarState['root'] = slot.always(
    getIntrinsicElementProps(
      'span',
      {
        role: 'img',
        id: baseId,
        // aria-label and/or aria-labelledby are resolved below
        ...props,
        ref,
      },
      /* excludedPropNames: */ ['name'],
    ),
    { elementType: 'span' },
  );
  const [imageHidden, setImageHidden] = React.useState<true | undefined>(undefined);
  let image: AvatarState['image'] = slot.optional(props.image, {
    defaultProps: { alt: '', role: 'presentation', 'aria-hidden': true, hidden: imageHidden },
    elementType: 'img',
  }); // Image shouldn't be rendered if its src is not set
  if (!image?.src) {
    image = undefined;
  } // Hide the image if it fails to load and restore it on a successful load
  if (image) {
    image.onError = mergeCallbacks(image.onError, () => setImageHidden(true));
    image.onLoad = mergeCallbacks(image.onLoad, () => setImageHidden(undefined));
  } // Resolve the initials slot, defaulted to getInitials.
  let initials: AvatarState['initials'] = slot.optional(props.initials, {
    renderByDefault: true,
    defaultProps: {
      children: getInitials(name, dir === 'rtl', { firstInitialOnly: size <= 16 }),
      id: baseId + '__initials',
    },
    elementType: 'span',
  }); // Don't render the initials slot if it's empty
  if (!initials?.children) {
    initials = undefined;
  } // Render the icon slot *only if* there aren't any initials or image to display
  let icon: AvatarState['icon'] = undefined;
  if (!initials && (!image || imageHidden)) {
    icon = slot.optional(props.icon, {
      renderByDefault: true,
      defaultProps: { children: <PersonRegular />, 'aria-hidden': true },
      elementType: 'span',
    });
  }
  const badge: AvatarState['badge'] = slot.optional(props.badge, {
    defaultProps: { size: getBadgeSize(size), id: baseId + '__badge' },
    elementType: PresenceBadge,
  });
  let activeAriaLabelElement: AvatarState['activeAriaLabelElement']; // Resolve aria-label and/or aria-labelledby if not provided by the user
  if (!root['aria-label'] && !root['aria-labelledby']) {
    if (name) {
      root['aria-label'] = name; // Include the badge in labelledby if it exists
      if (badge) {
        root['aria-labelledby'] = root.id + ' ' + badge.id;
      }
    } else if (initials) {
      // root's aria-label should be the name, but fall back to being labelledby the initials if name is missing
      root['aria-labelledby'] = initials.id + (badge ? ' ' + badge.id : '');
    } // Add the active state to the aria label
    if (active === 'active' || active === 'inactive') {
      const activeText = DEFAULT_STRINGS[active];
      if (root['aria-labelledby']) {
        // If using aria-labelledby, render a hidden span and append it to the labelledby
        const activeId = baseId + '__active';
        root['aria-labelledby'] += ' ' + activeId;
        activeAriaLabelElement = (
          <span hidden id={activeId}>
            {activeText}
          </span>
        );
      } else if (root['aria-label']) {
        // Otherwise, just append it to the aria-label
        root['aria-label'] += ' ' + activeText;
      }
    }
  }
  return {
    size,
    shape,
    active,
    activeAppearance,
    activeAriaLabelElement,
    color,
    components: { root: 'span', initials: 'span', icon: 'span', image: 'img', badge: PresenceBadge },
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
  'dark-red',
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
  'dark-green',
  'light-teal',
  'teal',
  'steel',
  'blue',
  'royal-blue',
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
