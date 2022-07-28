import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { useGroupChildClassName } from '../AvatarGroupItem/useAvatarGroupItemStyles';
import { useSizeStyles } from '../Avatar/useAvatarStyles';
import type { AvatarGroupOverflowSlots, AvatarGroupOverflowState } from './AvatarGroupOverflow.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const avatarGroupOverflowClassNames: SlotClassNames<AvatarGroupOverflowSlots> = {
  root: 'fui-AvatarGroupOverflow',
  overflowButton: 'fui-AvatarGroupOverflow__overflowButton',
  overflowContent: 'fui-AvatarGroupOverflow__overflowContent',
  overflowSurface: 'fui-AvatarGroupOverflow__overflowSurface',
};

/**
 * Styles for the overflowContent slot.
 */
export const useOverflowContentStyles = makeStyles({
  base: {
    maxHeight: '220px',
    minHeight: '80px',
    ...shorthands.overflow('hidden', 'scroll'),
    ...shorthands.padding(tokens.spacingHorizontalS),
    width: '220px',
  },
});

/**
 * Styles for the overflowSurface slot.
 */
export const useOverflowSurfaceStyles = makeStyles({
  base: {
    ...shorthands.padding(0),
  },
});

/**
 * Styles for the overflow button.
 */
const useOverflowButtonStyles = makeStyles({
  base: {
    display: 'inline-flex',
    position: 'relative',
    flexShrink: 0,
    justifyContent: 'center',
    alignItems: 'center',
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderColor(tokens.colorNeutralStroke1),
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
    ...shorthands.borderStyle('solid'),
    ...shorthands.padding(0),

    // Match color to Avatar's outline color.
    '@media (forced-colors: active)': {
      ...shorthands.borderColor('CanvasText'),
    },
  },

  // These styles match the default button styles.
  focusIndicator: createCustomFocusIndicatorStyle({
    ...shorthands.borderColor('transparent'),
    outlineColor: tokens.colorStrokeFocus2,
    outlineWidth: tokens.strokeWidthThick,
    outlineStyle: 'solid',
  }),

  states: {
    '&:hover': {
      color: tokens.colorNeutralForeground1Hover,
      backgroundColor: tokens.colorNeutralBackground1Hover,
      ...shorthands.borderColor(tokens.colorNeutralStroke1Hover),
    },
    '&:active': {
      color: tokens.colorNeutralForeground1Pressed,
      backgroundColor: tokens.colorNeutralBackground1Pressed,
      ...shorthands.borderColor(tokens.colorNeutralStroke1Pressed),
    },
  },

  selected: {
    color: tokens.colorNeutralForeground1Selected,
    backgroundColor: tokens.colorNeutralBackground1Selected,
    ...shorthands.borderColor(tokens.colorNeutralStroke1Selected),
  },

  icon12: { fontSize: '12px' },
  icon16: { fontSize: '16px' },
  icon20: { fontSize: '20px' },
  icon24: { fontSize: '24px' },
  icon28: { fontSize: '28px' },
  icon32: { fontSize: '32px' },
  icon48: { fontSize: '48px' },
  caption2Strong: { ...typographyStyles.caption2Strong },
  caption1Strong: { ...typographyStyles.caption1Strong },
  body1Strong: { ...typographyStyles.body1Strong },
  subtitle2: { ...typographyStyles.subtitle2 },
  subtitle1: { ...typographyStyles.subtitle1 },
  title3: { ...typographyStyles.title3 },
  borderThin: { ...shorthands.borderWidth(tokens.strokeWidthThin) },
  borderThick: { ...shorthands.borderWidth(tokens.strokeWidthThick) },
  borderThicker: { ...shorthands.borderWidth(tokens.strokeWidthThicker) },
  borderThickest: { ...shorthands.borderWidth(tokens.strokeWidthThickest) },
});

/**
 * Apply styling to the AvatarGroupOverflow slots based on the state
 */
export const useAvatarGroupOverflowStyles_unstable = (state: AvatarGroupOverflowState): AvatarGroupOverflowState => {
  const { overflowIndicator, size, layout, isPopoverOpen } = state;
  const sizeStyles = useSizeStyles();
  const overflowButtonStyles = useOverflowButtonStyles();
  const overflowContentStyles = useOverflowContentStyles();
  const overflowSurfaceStyles = useOverflowSurfaceStyles();
  const groupChildClassName = useGroupChildClassName(layout, size, true);

  const overflowButtonClasses = [];

  if (size < 36) {
    overflowButtonClasses.push(overflowButtonStyles.borderThin);
  } else if (size < 56) {
    overflowButtonClasses.push(overflowButtonStyles.borderThick);
  } else if (size < 72) {
    overflowButtonClasses.push(overflowButtonStyles.borderThicker);
  } else {
    overflowButtonClasses.push(overflowButtonStyles.borderThickest);
  }

  if (overflowIndicator === 'count') {
    if (size <= 24) {
      overflowButtonClasses.push(overflowButtonStyles.caption2Strong);
    } else if (size <= 28) {
      overflowButtonClasses.push(overflowButtonStyles.caption1Strong);
    } else if (size <= 40) {
      overflowButtonClasses.push(overflowButtonStyles.body1Strong);
    } else if (size <= 56) {
      overflowButtonClasses.push(overflowButtonStyles.subtitle2);
    } else if (size <= 96) {
      overflowButtonClasses.push(overflowButtonStyles.subtitle1);
    } else {
      overflowButtonClasses.push(overflowButtonStyles.title3);
    }
  } else {
    if (size <= 16) {
      overflowButtonClasses.push(overflowButtonStyles.icon12);
    } else if (size <= 24) {
      overflowButtonClasses.push(overflowButtonStyles.icon16);
    } else if (size <= 40) {
      overflowButtonClasses.push(overflowButtonStyles.icon20);
    } else if (size <= 48) {
      overflowButtonClasses.push(overflowButtonStyles.icon24);
    } else if (size <= 56) {
      overflowButtonClasses.push(overflowButtonStyles.icon28);
    } else if (size <= 72) {
      overflowButtonClasses.push(overflowButtonStyles.icon32);
    } else {
      overflowButtonClasses.push(overflowButtonStyles.icon48);
    }
  }

  if (state.overflowButton) {
    state.overflowButton.className = mergeClasses(
      avatarGroupOverflowClassNames.overflowButton,
      sizeStyles[size],
      overflowButtonStyles.base,
      ...overflowButtonClasses,
      groupChildClassName,
      overflowButtonStyles.focusIndicator,
      overflowButtonStyles.states,
      isPopoverOpen && overflowButtonStyles.selected,
      state.overflowButton.className,
    );
  }

  if (state.overflowContent) {
    state.overflowContent.className = mergeClasses(
      avatarGroupOverflowClassNames.overflowContent,
      overflowContentStyles.base,
      state.overflowContent.className,
    );
  }

  if (state.overflowSurface) {
    state.overflowSurface.className = mergeClasses(
      avatarGroupOverflowClassNames.overflowSurface,
      overflowSurfaceStyles.base,
      state.overflowSurface.className,
    );
  }

  return state;
};
