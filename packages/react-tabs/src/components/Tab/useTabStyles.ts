import type { TabSlots, TabState } from './Tab.types';

import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import {
  pendingContentSizeTokens,
  pendingSpacingTokens,
  tabIndicatorPadding,
  tabIndicatorStrokeWidths,
} from '../../tab.constants';
import { SlotClassNames } from '@fluentui/react-utilities';
import { useTabAnimatedIndicatorStyles_unstable } from './useTabAnimatedIndicator';

export const tabClassNames: SlotClassNames<TabSlots> = {
  root: 'fui-Tab',
  icon: 'fui-Tab__icon',
  content: 'fui-Tab__content',
};

// TODO temporary export to pass conformance test.
export const tabClassName = tabClassNames.root;

/**
 * Styles for the root slot
 */
/* eslint-disable @typescript-eslint/naming-convention */
const useRootStyles = makeStyles({
  base: {
    alignItems: 'center',
    ...shorthands.borderColor('none'),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.borderWidth(0),
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    fontFamily: tokens.fontFamilyBase,
    lineHeight: tokens.lineHeightBase300,
    outlineStyle: 'none',
    position: 'relative',
    ...shorthands.overflow('hidden'),
    textTransform: 'none',
  },
  mediumHorizontal: {
    columnGap: pendingSpacingTokens.sNudge,
    justifyContent: 'center',
    ...shorthands.padding(pendingSpacingTokens.m, pendingSpacingTokens.mNudge),
  },
  mediumVertical: {
    columnGap: pendingSpacingTokens.sNudge,
    justifyContent: 'flex-start',
    minWidth: '120px',
    ...shorthands.padding(pendingSpacingTokens.sNudge, pendingSpacingTokens.mNudge),
  },
  smallHorizontal: {
    columnGap: pendingSpacingTokens.xxs,
    ...shorthands.padding(pendingSpacingTokens.sNudge, pendingSpacingTokens.sNudge),
  },
  smallVertical: {
    columnGap: pendingSpacingTokens.xxs,
    ...shorthands.padding(pendingSpacingTokens.xxs, pendingSpacingTokens.sNudge),
  },
  transparent: {
    backgroundColor: tokens.colorTransparentBackground,
    ':hover': {
      backgroundColor: tokens.colorTransparentBackgroundHover,
    },
    ':active': {
      backgroundColor: tokens.colorTransparentBackgroundPressed,
    },
    '& .fui-Tab__icon': {
      color: tokens.colorNeutralForeground2,
    },
    ':hover .fui-Tab__icon': {
      color: tokens.colorNeutralForeground2Hover,
    },
    ':active .fui-Tab__icon': {
      color: tokens.colorNeutralForeground2Pressed,
    },
    '& .fui-Tab__content': {
      color: tokens.colorNeutralForeground2,
    },
    ':hover .fui-Tab__content': {
      color: tokens.colorNeutralForeground2Hover,
    },
    ':active .fui-Tab__content': {
      color: tokens.colorNeutralForeground2Pressed,
    },
  },
  subtle: {
    backgroundColor: tokens.colorSubtleBackground,
    ':hover': {
      backgroundColor: tokens.colorSubtleBackgroundHover,
    },
    ':active': {
      backgroundColor: tokens.colorSubtleBackgroundPressed,
    },
    '& .fui-Tab__icon': {
      color: tokens.colorNeutralForeground2,
    },
    ':hover .fui-Tab__icon': {
      color: tokens.colorNeutralForeground2Hover,
    },
    ':active .fui-Tab__icon': {
      color: tokens.colorNeutralForeground2Pressed,
    },
    '& .fui-Tab__content': {
      color: tokens.colorNeutralForeground2,
    },
    ':hover .fui-Tab__content': {
      color: tokens.colorNeutralForeground2Hover,
    },
    ':active .fui-Tab__content': {
      color: tokens.colorNeutralForeground2Pressed,
    },
  },
  disabled: {
    backgroundColor: tokens.colorTransparentBackground,

    '& .fui-Tab__icon': {
      color: tokens.colorNeutralForegroundDisabled,
    },
    '& .fui-Tab__content': {
      color: tokens.colorNeutralForegroundDisabled,
    },
    cursor: 'not-allowed',
  },
  selected: {
    '& .fui-Tab__icon': {
      color: tokens.colorCompoundBrandForeground1,
    },
    ':hover .fui-Tab__icon': {
      color: tokens.colorCompoundBrandForeground1Hover,
    },
    ':active .fui-Tab__icon': {
      color: tokens.colorCompoundBrandForeground1Pressed,
    },
    '& .fui-Tab__content': {
      color: tokens.colorNeutralForeground1,
    },
    ':hover .fui-Tab__content': {
      color: tokens.colorNeutralForeground1Hover,
    },
    ':active .fui-Tab__content': {
      color: tokens.colorNeutralForeground1Pressed,
    },
  },
});
/* eslint-enable @typescript-eslint/naming-convention */

/**
 * Focus styles for the root slot
 */
const useFocusStyles = makeStyles({
  // Tab creates a custom focus indicator because the default focus indicator
  // is applied using an :after pseudo-element on the root. Since the selection
  // indicator uses an :after pseudo-element on the root, there is a conflict.
  base: createCustomFocusIndicatorStyle({
    ...shorthands.borderColor('transparent'),
    outlineWidth: tokens.strokeWidthThick,
    outlineColor: 'transparent',
    outlineStyle: 'solid',
    boxShadow: `
      ${tokens.shadow4},
      0 0 0 ${tokens.strokeWidthThick} ${tokens.colorStrokeFocus2}
    `,
    zIndex: 1,
  }),
});

/** Indicator styles for when pending selection */
const usePendingIndicatorStyles = makeStyles({
  base: {
    ':hover:before': {
      backgroundColor: 'none',
      ...shorthands.borderStyle('solid'),
      ...shorthands.borderColor(tokens.colorNeutralStroke1Hover),
      ...shorthands.borderRadius(tokens.borderRadiusCircular),
      boxSizing: 'border-box',
      content: '""',
      position: 'absolute',
    },
    ':active:before': {
      backgroundColor: 'none',
      ...shorthands.borderStyle('solid'),
      ...shorthands.borderColor(tokens.colorNeutralStroke1Pressed),
      ...shorthands.borderRadius(tokens.borderRadiusCircular),
      boxSizing: 'border-box',
      content: '""',
      position: 'absolute',
    },
  },
  disabled: {
    ':hover:before': {
      ...shorthands.borderColor(tokens.colorTransparentStroke),
    },
    ':active:before': {
      ...shorthands.borderColor(tokens.colorTransparentStroke),
    },
  },
  mediumHorizontal: {
    ':before': {
      bottom: 0,
      ...shorthands.borderWidth(`calc(${tabIndicatorStrokeWidths.mediumHorizontal} / 2.0)`),
      height: tabIndicatorStrokeWidths.mediumHorizontal,
      left: tabIndicatorPadding.mediumHorizontal,
      right: tabIndicatorPadding.mediumHorizontal,
    },
  },
  mediumVertical: {
    ':before': {
      bottom: tabIndicatorPadding.mediumVertical,
      ...shorthands.borderWidth(`calc(${tabIndicatorStrokeWidths.mediumVertical} / 2.0)`),
      left: 0,
      top: tabIndicatorPadding.mediumVertical,
      width: tabIndicatorStrokeWidths.mediumVertical,
    },
  },
  smallHorizontal: {
    ':before': {
      bottom: 0,
      ...shorthands.borderWidth(`calc(${tabIndicatorStrokeWidths.smallHorizontal} / 2.0)`),
      height: tabIndicatorStrokeWidths.smallHorizontal,
      left: tabIndicatorPadding.smallHorizontal,
      right: tabIndicatorPadding.smallHorizontal,
    },
  },
  smallVertical: {
    ':before': {
      bottom: tabIndicatorPadding.smallVertical,
      ...shorthands.borderWidth(`calc(${tabIndicatorStrokeWidths.smallVertical} / 2.0)`),
      left: 0,
      top: tabIndicatorPadding.smallVertical,
      width: tabIndicatorStrokeWidths.smallVertical,
    },
  },
});

const useActiveIndicatorStyles = makeStyles({
  base: {
    ':after': {
      ...shorthands.borderColor(tokens.colorTransparentStroke),
      ...shorthands.borderStyle('solid'),
      ...shorthands.borderRadius(tokens.borderRadiusCircular),
      boxSizing: 'border-box',
      content: '""',
      position: 'absolute',
      zIndex: 1,
    },
  },
  selected: {
    ':after': {
      ...shorthands.borderColor(tokens.colorCompoundBrandStroke),
    },
    ':hover:after': {
      ...shorthands.borderColor(tokens.colorCompoundBrandStrokeHover),
    },
    ':active:after': {
      ...shorthands.borderColor(tokens.colorCompoundBrandStrokePressed),
    },
  },
  disabled: {
    ':after': {
      ...shorthands.borderColor(tokens.colorNeutralForegroundDisabled),
    },
  },
  mediumHorizontal: {
    ':after': {
      bottom: '0',
      ...shorthands.borderWidth(`calc(${tabIndicatorStrokeWidths.mediumHorizontal} / 2.0)`),
      height: tabIndicatorStrokeWidths.mediumHorizontal,
      left: tabIndicatorPadding.mediumHorizontal,
      right: tabIndicatorPadding.mediumHorizontal,
    },
  },
  mediumVertical: {
    ':after': {
      bottom: tabIndicatorPadding.mediumVertical,
      ...shorthands.borderWidth(`calc(${tabIndicatorStrokeWidths.mediumVertical} / 2.0)`),
      left: 0,
      top: tabIndicatorPadding.mediumVertical,
      width: tabIndicatorStrokeWidths.mediumVertical,
    },
  },
  smallHorizontal: {
    ':after': {
      bottom: 0,
      ...shorthands.borderWidth(`calc(${tabIndicatorStrokeWidths.smallHorizontal} / 2.0)`),
      height: tabIndicatorStrokeWidths.smallHorizontal,
      left: tabIndicatorPadding.smallHorizontal,
      right: tabIndicatorPadding.smallHorizontal,
    },
  },
  smallVertical: {
    ':after': {
      bottom: tabIndicatorPadding.smallVertical,
      ...shorthands.borderWidth(`calc(${tabIndicatorStrokeWidths.smallVertical} / 2.0)`),
      left: '0',
      top: tabIndicatorPadding.smallVertical,
      width: tabIndicatorStrokeWidths.smallVertical,
    },
  },
});

/**
 * Styles for the icon slot.
 */
const useIconStyles = makeStyles({
  base: {
    alignItems: 'center',
    display: 'inline-flex',
    justifyContent: 'center',
    ...shorthands.overflow('hidden'),
  },
  // per design, the small and medium font sizes are the same.
  // the size prop only affects spacing.
  small: {
    fontSize: '20px',
    height: '20px',
    width: '20px',
  },
  medium: {
    fontSize: '20px',
    height: '20px',
    width: '20px',
  },
});

/**
 * Styles for the content slot (children)
 */
const useContentStyles = makeStyles({
  base: {
    ...pendingContentSizeTokens.body1,
    ...shorthands.overflow('hidden'),
    // content padding is the same for medium & small, horiztonal & vertical
    ...shorthands.padding(0, pendingSpacingTokens.xxs),
  },
  selected: {
    ...pendingContentSizeTokens.body1Strong,
  },
});

/**
 * Apply styling to the Tab slots based on the state
 */
export const useTabStyles_unstable = (state: TabState): TabState => {
  const rootStyles = useRootStyles();
  const focusStyles = useFocusStyles();
  const pendingIndicatorStyles = usePendingIndicatorStyles();
  const activeIndicatorStyles = useActiveIndicatorStyles();
  const iconStyles = useIconStyles();
  const contentStyles = useContentStyles();

  const { appearance, disabled, selected, size, vertical } = state;

  state.root.className = mergeClasses(
    tabClassNames.root,
    rootStyles.base,
    size !== 'small' && (vertical ? rootStyles.mediumVertical : rootStyles.mediumHorizontal),
    size === 'small' && (vertical ? rootStyles.smallVertical : rootStyles.smallHorizontal),
    focusStyles.base,
    !disabled && appearance === 'subtle' && rootStyles.subtle,
    !disabled && appearance === 'transparent' && rootStyles.transparent,
    !disabled && selected && rootStyles.selected,
    disabled && rootStyles.disabled,

    // pending indicator (before pseudo element)
    pendingIndicatorStyles.base,
    size !== 'small' && (vertical ? pendingIndicatorStyles.mediumVertical : pendingIndicatorStyles.mediumHorizontal),
    size === 'small' && (vertical ? pendingIndicatorStyles.smallVertical : pendingIndicatorStyles.smallHorizontal),
    disabled && pendingIndicatorStyles.disabled,

    // active indicator (after pseudo element)
    selected && activeIndicatorStyles.base,
    selected && !disabled && activeIndicatorStyles.selected,
    selected &&
      size !== 'small' &&
      (vertical ? activeIndicatorStyles.mediumVertical : activeIndicatorStyles.mediumHorizontal),
    selected &&
      size === 'small' &&
      (vertical ? activeIndicatorStyles.smallVertical : activeIndicatorStyles.smallHorizontal),
    selected && disabled && activeIndicatorStyles.disabled,
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(tabClassNames.icon, iconStyles.base, iconStyles[size], state.icon.className);
  }

  state.content.className = mergeClasses(
    tabClassNames.content,
    contentStyles.base,
    selected && contentStyles.selected,
    state.content.className,
  );

  useTabAnimatedIndicatorStyles_unstable(state);

  return state;
};
