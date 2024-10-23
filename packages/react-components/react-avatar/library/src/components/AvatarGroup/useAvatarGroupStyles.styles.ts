import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { useSizeStyles } from '../Avatar/useAvatarStyles.styles';
import type { AvatarGroupSlots, AvatarGroupState } from './AvatarGroup.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const avatarGroupClassNames: SlotClassNames<AvatarGroupSlots> = {
  root: 'fui-AvatarGroup',
};

/**
 * Styles for the root slot.
 */
const useStyles = makeStyles({
  base: {
    display: 'inline-flex',
    position: 'relative',
  },
  pie: {
    clipPath: 'circle(50%)',
    backgroundColor: tokens.colorTransparentStroke,
    '@media (forced-colors: active)': {
      backgroundColor: 'CanvasText',
    },
  },
});

/**
 * Apply styling to the AvatarGroup slots based on the state
 */
export const useAvatarGroupStyles_unstable = (state: AvatarGroupState): AvatarGroupState => {
  'use no memo';

  const { layout, size } = state;
  const styles = useStyles();
  const sizeStyles = useSizeStyles();

  state.root.className = mergeClasses(
    avatarGroupClassNames.root,
    styles.base,
    layout === 'pie' && sizeStyles[size],
    layout === 'pie' && styles.pie,
    state.root.className,
  );

  return state;
};
