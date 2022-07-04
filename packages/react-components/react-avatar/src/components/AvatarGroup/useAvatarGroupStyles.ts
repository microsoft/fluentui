import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { useSizeStyles } from '../Avatar/useAvatarStyles';
import type { AvatarGroupSlots, AvatarGroupState } from './AvatarGroup.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useGroupChildClassName } from '../../AvatarGroupItem';

export const avatarGroupClassNames: SlotClassNames<AvatarGroupSlots> = {
  root: 'fui-AvatarGroup',
  overflowContent: 'fui-AvatarGroup__overflowContent',
  overflowButton: 'fui-AvatarGroup__overflowButton',
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
  focusIndicator: createCustomFocusIndicatorStyle(
    {
      ...shorthands.borderColor('transparent'),
      outlineColor: tokens.colorStrokeFocus2,
      outlineWidth: tokens.strokeWidthThick,
      outlineStyle: 'solid',
    },
    { selector: 'focus-within' },
  ),
});

/**
 * Styles for overflow button slot.
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

    // match color to Avatar's outline color
    '@media (forced-colors: active)': {
      ...shorthands.borderColor('CanvasText'),
    },
  },

  // These styles match the default button styles
  focusIndicator: createCustomFocusIndicatorStyle({
    ...shorthands.borderColor('transparent'),
    outlineColor: tokens.colorStrokeFocus2,
    outlineWidth: tokens.strokeWidthThick,
    outlineStyle: 'solid',
  }),

  states: {
    ':hover': {
      color: tokens.colorNeutralForeground1Hover,
      backgroundColor: tokens.colorNeutralBackground1Hover,
      ...shorthands.borderColor(tokens.colorNeutralStroke1Hover),
    },
    ':active': {
      color: tokens.colorNeutralForeground1Pressed,
      backgroundColor: tokens.colorNeutralBackground1Pressed,
      ...shorthands.borderColor(tokens.colorNeutralStroke1Pressed),
    },
  },

  pie: {
    backgroundColor: tokens.colorTransparentBackground,
    ...shorthands.borderColor(tokens.colorTransparentStroke),
    color: 'transparent',
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
 * Styles for overflow list slot.
 */
const useOverflowContentStyles = makeStyles({
  base: {
    maxHeight: '220px',
    minHeight: '80px',
    ...shorthands.overflow('hidden', 'scroll'),
    ...shorthands.padding(tokens.spacingHorizontalS),
    width: '220px',
  },
});

/**
 * Apply styling to the AvatarGroup slots based on the state
 */
export const useAvatarGroupStyles_unstable = (state: AvatarGroupState): AvatarGroupState => {
  const { layout, overflowIndicator, size } = state;
  const styles = useStyles();
  const sizeStyles = useSizeStyles();
  const overflowContentStyles = useOverflowContentStyles();
  const overflowButtonStyles = useOverflowButtonStyles();

  const groupChildClassName = useGroupChildClassName(layout, size, true);

  state.root.className = mergeClasses(
    avatarGroupClassNames.root,
    styles.base,
    layout === 'pie' && styles.pie,
    layout === 'pie' && sizeStyles[size],
    layout === 'pie' && styles.focusIndicator,
    state.root.className,
  );

  if (state.overflowContent) {
    state.overflowContent.className = mergeClasses(
      avatarGroupClassNames.overflowContent,
      overflowContentStyles.base,
      state.overflowContent.className,
    );
  }

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
      avatarGroupClassNames.overflowButton,
      sizeStyles[size],
      overflowButtonStyles.base,
      ...overflowButtonClasses,
      layout !== 'pie' && overflowButtonStyles.states,
      layout !== 'pie' && overflowButtonStyles.focusIndicator,
      layout === 'pie' && overflowButtonStyles.pie,
      groupChildClassName,
      state.overflowButton.className,
    );
  }

  return state;
};
