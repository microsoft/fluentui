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

// Exclusive upper boundaries, unlike the two content ladders below. Every range is written in full
// so the keys partition AvatarSize with no implied else; `+()` coerces a condition to 1 or 0
// because TS rejects a bare boolean computed key (TS2464).
const borderClass = (size: AvatarSize) =>
  ({
    [+(size < 36)]: styles.borderThin,
    [+(size >= 36 && size < 56)]: styles.borderThick,
    [+(size >= 56 && size < 72)]: styles.borderThicker,
    [+(size >= 72)]: styles.borderThickest,
  })[1];

// Typography lives here and never on `.trigger-button`: Griffel's base bucket sets no font, and
// under `indicator="icon"` no typography class is merged at all.
const countClass = (size: AvatarSize) =>
  ({
    [+(size <= 24)]: styles.textCaption2Strong,
    [+(size > 24 && size <= 28)]: styles.textCaption1Strong,
    [+(size > 28 && size <= 40)]: styles.textBody1Strong,
    [+(size > 40 && size <= 56)]: styles.textSubtitle2,
    [+(size > 56 && size <= 96)]: styles.textSubtitle1,
    [+(size > 96)]: styles.textTitle3,
  })[1];

const iconClass = (size: AvatarSize) =>
  ({
    [+(size <= 16)]: styles.icon12,
    [+(size > 16 && size <= 24)]: styles.icon16,
    [+(size > 24 && size <= 40)]: styles.icon20,
    [+(size > 40 && size <= 48)]: styles.icon24,
    [+(size > 48 && size <= 56)]: styles.icon28,
    [+(size > 56 && size <= 72)]: styles.icon32,
    [+(size > 72)]: styles.icon48,
  })[1];

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
