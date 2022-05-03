import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { AvatarGroupSlots, AvatarGroupState } from './AvatarGroup.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const avatarGroupClassNames: SlotClassNames<AvatarGroupSlots> = {
  root: 'fui-AvatarGroup',
  popoverSurface: 'fui-AvatarGroup__popoverSurface',
  popoverTrigger: 'fui-AvatarGroup__popoverTrigger',
};

export const extraAvatarGroupClassNames = {
  popoverSurfaceItem: 'fui-AvatarGroup__popoverSurfaceItem',
  popoverSurfaceContainer: 'fui-AvatarGroup__popoverSurfaceContainer',
};

/**
 * Styles for the root slot.
 */
const useStyles = makeStyles({
  base: {
    display: 'inline-flex',
    position: 'relative',
  },
});

/**
 * Styles for each size.
 */
const useSizeStyles = makeStyles({
  20: { width: '20px', height: '20px' },
  24: { width: '24px', height: '24px' },
  28: { width: '28px', height: '28px' },
  32: { width: '32px', height: '32px' },
  36: { width: '36px', height: '36px' },
  40: { width: '40px', height: '40px' },
  48: { width: '48px', height: '48px' },
  56: { width: '56px', height: '56px' },
  64: { width: '64px', height: '64px' },
  72: { width: '72px', height: '72px' },
  96: { width: '96px', height: '96px' },
  120: { width: '120px', height: '120px' },
  128: { width: '128px', height: '128px' },
});

/**
 * Styles for the PopoverTrigger.
 */
const usePopoverTriggerStyles = makeStyles({
  base: {
    flexShrink: 0,
    minWidth: 0,
    minHeight: 0,
    maxWidth: 'unset',
    maxHeight: 'unset',
    ...shorthands.padding(0),
  },
  pie: {
    backgroundColor: 'transparent',
    ...shorthands.borderColor('transparent'),
    ':focus': {
      backgroundColor: 'transparent',
    },
  },
});

const usePopoverSurfaceStyles = makeStyles({
  base: {
    [`& > .${extraAvatarGroupClassNames.popoverSurfaceContainer}`]: {
      listStyleType: 'none',
      ...shorthands.margin(0),
      ...shorthands.padding(0),
    },
  },
});

/**
 * Apply styling to the AvatarGroup slots based on the state
 */
export const useAvatarGroupStyles_unstable = (state: AvatarGroupState): AvatarGroupState => {
  const { layout, size } = state;
  const styles = useStyles();
  const sizeStyles = useSizeStyles();
  const popoverTriggerStyles = usePopoverTriggerStyles();
  const popoverSurfaceStyles = usePopoverSurfaceStyles();

  state.root.className = mergeClasses(avatarGroupClassNames.root, styles.base, state.root.className);

  if (state.popoverSurface) {
    state.popoverSurface.className = mergeClasses(
      avatarGroupClassNames.popoverSurface,
      popoverSurfaceStyles.base,
      state.popoverSurface.className,
    );
  }

  if (state.popoverTrigger) {
    const popoverTriggerClassNames = [popoverTriggerStyles.base, sizeStyles[size]];

    if (layout === 'pie') {
      popoverTriggerClassNames.push(popoverTriggerStyles.pie);
    }

    state.popoverTrigger.className = mergeClasses(
      avatarGroupClassNames.popoverTrigger,
      ...popoverTriggerClassNames,
      state.popoverTrigger.className,
    );
  }

  return state;
};
