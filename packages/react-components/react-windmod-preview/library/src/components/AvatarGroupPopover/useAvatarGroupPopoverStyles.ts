import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import { slotClasses } from '../../utils/slotClasses';
import type { AvatarSize } from '../Avatar';
import { groupChildClasses } from '../AvatarGroupItem/groupChildClasses';
import type { AvatarGroupPopoverState } from './AvatarGroupPopover.types';

import styles from './AvatarGroupPopover.module.css';

/**
 * The only public classes — see componentMarkers. AvatarGroupPopover renders no root element of
 * its own, so the pair sits on the trigger button.
 */
export const avatarGroupPopoverClassNames: { triggerButton: string } = {
  triggerButton: componentMarkers('avatar-group-popover'),
};

type TriggerButtonDataAttributes = {
  'data-size'?: AvatarGroupPopoverState['size'];
  'data-selected'?: true;
};

// Exclusive boundaries, unlike the two content ladders below.
const borderClass = (size: AvatarSize) => {
  if (size < 36) {
    return styles.borderThin;
  }
  if (size < 56) {
    return styles.borderThick;
  }
  if (size < 72) {
    return styles.borderThicker;
  }
  return styles.borderThickest;
};

// Typography lives here and never on `.trigger-button`: Griffel's base bucket sets no font, and
// under `indicator="icon"` no typography class is merged at all.
const countClass = (size: AvatarSize) => {
  if (size <= 24) {
    return styles.textCaption2Strong;
  }
  if (size <= 28) {
    return styles.textCaption1Strong;
  }
  if (size <= 40) {
    return styles.textBody1Strong;
  }
  if (size <= 56) {
    return styles.textSubtitle2;
  }
  if (size <= 96) {
    return styles.textSubtitle1;
  }
  return styles.textTitle3;
};

const iconClass = (size: AvatarSize) => {
  if (size <= 16) {
    return styles.icon12;
  }
  if (size <= 24) {
    return styles.icon16;
  }
  if (size <= 40) {
    return styles.icon20;
  }
  if (size <= 48) {
    return styles.icon24;
  }
  if (size <= 56) {
    return styles.icon28;
  }
  if (size <= 72) {
    return styles.icon32;
  }
  return styles.icon48;
};

/**
 * Applies the visual contract, returning new state. `data-selected` mirrors the JS gate Griffel
 * uses to merge its selected bucket, and the pie layout suppresses it there too.
 */
export const useAvatarGroupPopoverStyles = (state: AvatarGroupPopoverState): AvatarGroupPopoverState => {
  const { indicator, layout, popoverOpen, size } = state;

  const triggerButton: AvatarGroupPopoverState['triggerButton'] & TriggerButtonDataAttributes = {
    ...state.triggerButton,
    'data-size': size,
    'data-selected': layout !== 'pie' && popoverOpen ? true : undefined,
    className: clsx(
      avatarGroupPopoverClassNames.triggerButton,
      groupChildClasses(layout, size),
      styles.triggerButton,
      layout === 'pie' && styles.triggerButtonPie,
      borderClass(size),
      indicator === 'count' ? countClass(size) : iconClass(size),
      state.triggerButton.className,
    ),
  };

  return {
    ...state,
    triggerButton,
    content: slotClasses(state.content, styles.content),
    popoverSurface: slotClasses(state.popoverSurface, styles.popoverSurface),
  };
};
