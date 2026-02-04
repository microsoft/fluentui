'use client';

import * as React from 'react';
import { mergeCallbacks, useId, slot } from '@fluentui/react-utilities';
import { getInitials } from '../../utils/index';
import type { AvatarBaseProps, AvatarBaseState, AvatarNamedColor, AvatarProps, AvatarState } from './Avatar.types';
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
    size = contextSize ?? (32 as const),
    shape = contextShape ?? 'circular',
    active = 'unset',
    activeAppearance = 'ring',
    idForColor,
    color: propColor = 'neutral',
    ...rest
  } = props;

  const state = useAvatarBase_unstable(rest, ref);

  // Resolve 'colorful' to a specific color name
  const color: AvatarState['color'] =
    propColor === 'colorful'
      ? avatarColors[getHashCode(idForColor ?? props.name ?? '') % avatarColors.length]
      : propColor;

  if (state.initials) {
    state.initials = slot.optional(props.initials, {
      renderByDefault: true,
      defaultProps: {
        children: getInitials(props.name, dir === 'rtl', { firstInitialOnly: size <= 16 }),
        id: state.initials?.id,
      },
      elementType: 'span',
    });
  }

  if (state.icon) {
    state.icon.children ??= <PersonRegular />;
  }

  const badge: AvatarState['badge'] = slot.optional(props.badge, {
    defaultProps: { size: getBadgeSize(size), id: state.root.id + '__badge' },
    elementType: PresenceBadge,
  });

  let activeAriaLabelElement: AvatarState['activeAriaLabelElement'] = state.activeAriaLabelElement;

  // Enhance aria-label and/or aria-labelledby to include badge and active state
  // Only process if aria attributes were not explicitly provided by the user
  const userProvidedAriaLabel = props['aria-label'] !== undefined;
  const userProvidedAriaLabelledby = props['aria-labelledby'] !== undefined;

  if (!userProvidedAriaLabel && !userProvidedAriaLabelledby) {
    if (props.name) {
      if (badge) {
        state.root['aria-labelledby'] = state.root.id + ' ' + badge.id;
      }
    } else if (state.initials) {
      // root's aria-label should be the name, but fall back to being labelledby the initials if name is missing
      state.root['aria-labelledby'] = state.initials.id + (badge ? ' ' + badge.id : '');
      delete state.root['aria-label'];
    }
    // Add the active state to the aria label
    if (active === 'active' || active === 'inactive') {
      const activeText = DEFAULT_STRINGS[active];
      if (state.root['aria-labelledby']) {
        // If using aria-labelledby, render a hidden span and append it to the labelledby
        const activeId = state.root.id + '__active';
        state.root['aria-labelledby'] += ' ' + activeId;
        activeAriaLabelElement = (
          <span hidden id={activeId}>
            {activeText}
          </span>
        );
      } else if (state.root['aria-label']) {
        // Otherwise, just append it to the aria-label
        state.root['aria-label'] += ' ' + activeText;
      }
    }
  }

  return {
    ...state,
    size,
    shape,
    active,
    activeAppearance,
    activeAriaLabelElement,
    color,
    badge,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    components: { ...state.components, badge: PresenceBadge },
  };
};

/**
 * Base hook for Avatar component, manages state and structure common to all variants of Avatar
 */
export const useAvatarBase_unstable = (props: AvatarBaseProps, ref?: React.Ref<HTMLElement>): AvatarBaseState => {
  const { dir } = useFluent();
  const { name, ...rest } = props;

  const baseId = useId('avatar-');

  const root: AvatarBaseState['root'] = slot.always(
    {
      role: 'img',
      id: baseId,
      ref,
      ...rest,
    },
    { elementType: 'span' },
  );

  const [imageHidden, setImageHidden] = React.useState<true | undefined>(undefined);

  let image: AvatarBaseState['image'] = slot.optional(props.image, {
    defaultProps: { alt: '', role: 'presentation', 'aria-hidden': true, hidden: imageHidden },
    elementType: 'img',
  });

  // Image shouldn't be rendered if its src is not set
  if (!image?.src) {
    image = undefined;
  }

  // Hide the image if it fails to load and restore it on a successful load
  if (image) {
    image.onError = mergeCallbacks(image.onError, () => setImageHidden(true));
    image.onLoad = mergeCallbacks(image.onLoad, () => setImageHidden(undefined));
  }

  // Resolve the initials slot, defaulted to getInitials
  let initials: AvatarBaseState['initials'] = slot.optional(props.initials, {
    renderByDefault: true,
    defaultProps: {
      children: getInitials(name, dir === 'rtl'),
      id: baseId + '__initials',
    },
    elementType: 'span',
  });

  // Don't render the initials slot if it's empty
  if (!initials?.children) {
    initials = undefined;
  }

  // Render the icon slot *only if* there aren't any initials or image to display
  let icon: AvatarBaseState['icon'] = undefined;
  if (!initials && (!image || imageHidden)) {
    icon = slot.optional(props.icon, {
      renderByDefault: true,
      defaultProps: {
        'aria-hidden': true,
      },
      elementType: 'span',
    });
  }

  let activeAriaLabelElement: AvatarBaseState['activeAriaLabelElement'];

  // Resolve aria-label and/or aria-labelledby if not provided by the user
  if (!root['aria-label'] && !root['aria-labelledby']) {
    if (name) {
      root['aria-label'] = name;
    } else if (initials) {
      // root's aria-label should be the name, but fall back to being labelledby the initials if name is missing
      root['aria-labelledby'] = initials.id;
    }
  }

  return {
    activeAriaLabelElement,
    components: { root: 'span', initials: 'span', icon: 'span', image: 'img' },
    root,
    initials,
    icon,
    image,
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
