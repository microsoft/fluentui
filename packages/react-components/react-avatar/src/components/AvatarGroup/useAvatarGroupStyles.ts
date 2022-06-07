import { avatarGroupItemMarginVar, avatarGroupItemOutlineVar } from '../AvatarGroupItem/useAvatarGroupItemStyles';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { useSizeStyles } from '../Avatar/useAvatarStyles';
import type { AvatarGroupSlots, AvatarGroupState } from './AvatarGroup.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

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
  },
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
    ...shorthands.padding(tokens.spacingHorizontalNone),
  },

  // These styles match the default button styles
  focusIndicator: createCustomFocusIndicatorStyle({
    ...shorthands.borderColor('transparent'),
    outlineColor: 'transparent',
    outlineWidth: tokens.strokeWidthThick,
    outlineStyle: 'solid',
    boxShadow: `${tokens.shadow4} 0 0 0 2px ${tokens.colorStrokeFocus2}`,
    zIndex: 1,
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

  stack: {
    marginLeft: `var(${avatarGroupItemMarginVar})`,
    outlineColor: tokens.colorNeutralBackground2,
    outlineStyle: 'solid',
    outlineWidth: `var(${avatarGroupItemOutlineVar})`,
  },

  spread: {
    marginLeft: `var(${avatarGroupItemMarginVar})`,
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
  thin: { ...shorthands.borderWidth(tokens.strokeWidthThin) },
  thick: { ...shorthands.borderWidth(tokens.strokeWidthThick) },
  thicker: { ...shorthands.borderWidth(tokens.strokeWidthThicker) },
  thickest: { ...shorthands.borderWidth(tokens.strokeWidthThickest) },
});

const useStackStyles = makeStyles({
  thick: { [avatarGroupItemOutlineVar]: tokens.strokeWidthThick },
  thicker: { [avatarGroupItemOutlineVar]: tokens.strokeWidthThicker },
  thickest: { [avatarGroupItemOutlineVar]: tokens.strokeWidthThickest },
  xxs: { [avatarGroupItemMarginVar]: `calc(-1 * ${tokens.spacingHorizontalXXS})` },
  xs: { [avatarGroupItemMarginVar]: `calc(-1 * ${tokens.spacingHorizontalXS})` },
  s: { [avatarGroupItemMarginVar]: `calc(-1 * ${tokens.spacingHorizontalS})` },
  l: { [avatarGroupItemMarginVar]: `calc(-1 * ${tokens.spacingHorizontalL})` },
});

const useSpreadStyles = makeStyles({
  s: { [avatarGroupItemMarginVar]: tokens.spacingHorizontalS },
  mNudge: { [avatarGroupItemMarginVar]: tokens.spacingHorizontalMNudge },
  m: { [avatarGroupItemMarginVar]: tokens.spacingHorizontalM },
  l: { [avatarGroupItemMarginVar]: tokens.spacingHorizontalL },
  xl: { [avatarGroupItemMarginVar]: tokens.spacingHorizontalXL },
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
  const stackStyles = useStackStyles();
  const spreadStyles = useSpreadStyles();
  const overflowButtonStyles = useOverflowButtonStyles();

  const rootClasses = [];

  if (layout === 'stack') {
    if (size < 56) {
      rootClasses.push(stackStyles.thick);
    } else if (size < 72) {
      rootClasses.push(stackStyles.thicker);
    } else {
      rootClasses.push(stackStyles.thickest);
    }

    if (size < 24) {
      rootClasses.push(stackStyles.xxs);
    } else if (size < 48) {
      rootClasses.push(stackStyles.xs);
    } else if (size < 96) {
      rootClasses.push(stackStyles.s);
    } else {
      rootClasses.push(stackStyles.l);
    }
  } else if (layout === 'spread') {
    if (size < 20) {
      rootClasses.push(spreadStyles.s);
    } else if (size < 32) {
      rootClasses.push(spreadStyles.mNudge);
    } else if (size < 64) {
      rootClasses.push(spreadStyles.l);
    } else {
      rootClasses.push(spreadStyles.xl);
    }
  } else {
    rootClasses.push(styles.pie);
    rootClasses.push(sizeStyles[size]);
  }

  state.root.className = mergeClasses(avatarGroupClassNames.root, styles.base, ...rootClasses, state.root.className);

  if (state.overflowContent) {
    state.overflowContent.className = mergeClasses(
      avatarGroupClassNames.overflowContent,
      overflowContentStyles.base,
      state.overflowContent.className,
    );
  }

  const overflowButtonClasses = [];

  if (size < 36) {
    overflowButtonClasses.push(overflowButtonStyles.thin);
  } else if (size < 56) {
    overflowButtonClasses.push(overflowButtonStyles.thick);
  } else if (size < 72) {
    overflowButtonClasses.push(overflowButtonStyles.thicker);
  } else {
    overflowButtonClasses.push(overflowButtonStyles.thickest);
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
      overflowButtonStyles.focusIndicator,
      layout !== 'pie' && overflowButtonStyles.states,
      layout === 'pie' && overflowButtonStyles.pie,
      layout === 'spread' && overflowButtonStyles.spread,
      layout === 'stack' && overflowButtonStyles.stack,
      ...overflowButtonClasses,
      state.overflowButton.className,
    );
  }

  return state;
};
