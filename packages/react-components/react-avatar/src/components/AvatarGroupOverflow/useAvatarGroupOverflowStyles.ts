import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { useGroupChildClassName } from '../AvatarGroupItem/useAvatarGroupItemStyles';
import { useSizeStyles } from '../Avatar/useAvatarStyles';
import type { AvatarGroupOverflowSlots, AvatarGroupOverflowState } from './AvatarGroupOverflow.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const avatarGroupOverflowClassNames: SlotClassNames<AvatarGroupOverflowSlots> = {
  root: 'fui-AvatarGroupOverflow',
  triggerButton: 'fui-AvatarGroupOverflow__triggerButton',
  content: 'fui-AvatarGroupOverflow__content',
  popoverSurface: 'fui-AvatarGroupOverflow__popoverSurface',
  tooltip: 'fui-AvatarGroupOverflow__tooltip',
};

/**
 * Styles for the content slot.
 */
const useContentStyles = makeStyles({
  base: {
    maxHeight: '220px',
    minHeight: '80px',
    ...shorthands.overflow('hidden', 'scroll'),
    ...shorthands.padding(tokens.spacingHorizontalS),
    width: '220px',
  },
});

/**
 * Styles for the popoverSurface slot.
 */
const usePopoverSurfaceStyles = makeStyles({
  base: {
    ...shorthands.padding(0),
  },
});

/**
 * Styles for the triggerButton slot.
 */
const useTriggerButtonStyles = makeStyles({
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
  const { indicator, size, layout, popoverOpen } = state;
  const sizeStyles = useSizeStyles();
  const triggerButtonStyles = useTriggerButtonStyles();
  const contentStyles = useContentStyles();
  const popoverSurfaceStyles = usePopoverSurfaceStyles();
  const groupChildClassName = useGroupChildClassName(layout, size, true);

  const triggerButtonClasses = [];

  if (size < 36) {
    triggerButtonClasses.push(triggerButtonStyles.borderThin);
  } else if (size < 56) {
    triggerButtonClasses.push(triggerButtonStyles.borderThick);
  } else if (size < 72) {
    triggerButtonClasses.push(triggerButtonStyles.borderThicker);
  } else {
    triggerButtonClasses.push(triggerButtonStyles.borderThickest);
  }

  if (indicator === 'count') {
    if (size <= 24) {
      triggerButtonClasses.push(triggerButtonStyles.caption2Strong);
    } else if (size <= 28) {
      triggerButtonClasses.push(triggerButtonStyles.caption1Strong);
    } else if (size <= 40) {
      triggerButtonClasses.push(triggerButtonStyles.body1Strong);
    } else if (size <= 56) {
      triggerButtonClasses.push(triggerButtonStyles.subtitle2);
    } else if (size <= 96) {
      triggerButtonClasses.push(triggerButtonStyles.subtitle1);
    } else {
      triggerButtonClasses.push(triggerButtonStyles.title3);
    }
  } else {
    if (size <= 16) {
      triggerButtonClasses.push(triggerButtonStyles.icon12);
    } else if (size <= 24) {
      triggerButtonClasses.push(triggerButtonStyles.icon16);
    } else if (size <= 40) {
      triggerButtonClasses.push(triggerButtonStyles.icon20);
    } else if (size <= 48) {
      triggerButtonClasses.push(triggerButtonStyles.icon24);
    } else if (size <= 56) {
      triggerButtonClasses.push(triggerButtonStyles.icon28);
    } else if (size <= 72) {
      triggerButtonClasses.push(triggerButtonStyles.icon32);
    } else {
      triggerButtonClasses.push(triggerButtonStyles.icon48);
    }
  }

  state.triggerButton.className = mergeClasses(
    avatarGroupOverflowClassNames.triggerButton,
    sizeStyles[size],
    triggerButtonStyles.base,
    ...triggerButtonClasses,
    groupChildClassName,
    triggerButtonStyles.focusIndicator,
    triggerButtonStyles.states,
    popoverOpen && triggerButtonStyles.selected,
    state.triggerButton.className,
  );

  state.content.className = mergeClasses(
    avatarGroupOverflowClassNames.content,
    contentStyles.base,
    state.content.className,
  );

  state.popoverSurface.className = mergeClasses(
    avatarGroupOverflowClassNames.popoverSurface,
    popoverSurfaceStyles.base,
    state.popoverSurface.className,
  );

  return state;
};
