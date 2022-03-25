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

export const tabSlotClassNames: SlotClassNames<TabSlots> = {
  root: 'fui-Tab',
  icon: 'fui-Tab__icon',
  content: 'fui-Tab__content',
};

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  base: {
    alignItems: 'center',
    backgroundColor: 'transparent ',
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
    columnGap: pendingSpacingTokens.xs,
    ...shorthands.padding(pendingSpacingTokens.xxs, pendingSpacingTokens.sNudge),
  },
  subtle: {
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  selected: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '& .fui-Tab__icon': {
      color: tokens.colorCompoundBrandForeground1,
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ':hover .fui-Tab__icon': {
      color: tokens.colorCompoundBrandForeground1Hover,
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ':active .fui-Tab__icon': {
      color: tokens.colorCompoundBrandForeground1Pressed,
    },
  },
});

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
    ':before': {
      backgroundColor: 'none',
      ...shorthands.borderStyle('solid'),
      ...shorthands.borderColor(tokens.colorTransparentStroke),
      ...shorthands.borderRadius(tokens.borderRadiusCircular),
      boxSizing: 'border-box',
      content: '""',
      position: 'absolute',
    },
    ':hover:before': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1),
    },
    ':active:before': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1),
    },
  },
  mediumHorizontal: {
    ':before': {
      bottom: 0,
      ...shorthands.borderWidth(`calc(${tabIndicatorStrokeWidths.mediumHorizontal} / 2.0 `),
      height: tabIndicatorStrokeWidths.mediumHorizontal,
      left: tabIndicatorPadding.mediumHorizontal,
      right: tabIndicatorPadding.mediumHorizontal,
    },
  },
  mediumVertical: {
    ':before': {
      bottom: tabIndicatorPadding.mediumVertical,
      ...shorthands.borderWidth(`calc(${tabIndicatorStrokeWidths.mediumVertical} / 2.0 `),
      left: 0,
      top: tabIndicatorPadding.mediumVertical,
      width: tabIndicatorStrokeWidths.mediumVertical,
    },
  },
  smallHorizontal: {
    ':before': {
      bottom: 0,
      ...shorthands.borderWidth(`calc(${tabIndicatorStrokeWidths.smallHorizontal} / 2.0 `),
      height: tabIndicatorStrokeWidths.smallHorizontal,
      left: tabIndicatorPadding.smallHorizontal,
      right: tabIndicatorPadding.smallHorizontal,
    },
  },
  smallVertical: {
    ':before': {
      bottom: tabIndicatorPadding.smallVertical,
      ...shorthands.borderWidth(`calc(${tabIndicatorStrokeWidths.smallVertical} / 2.0 `),
      left: 0,
      top: tabIndicatorPadding.smallVertical,
      width: tabIndicatorStrokeWidths.smallVertical,
    },
  },
});

const useActiveIndicatorStyles = makeStyles({
  base: {
    ':after': {
      ...shorthands.borderColor(tokens.colorCompoundBrandForeground1),
      ...shorthands.borderStyle('solid'),
      ...shorthands.borderRadius(tokens.borderRadiusCircular),
      boxSizing: 'border-box',
      content: '""',
      position: 'absolute',
      zIndex: 1,
    },
  },
  mediumHorizontal: {
    ':after': {
      bottom: '0',
      ...shorthands.borderWidth(`calc(${tabIndicatorStrokeWidths.mediumHorizontal} / 2.0 `),
      height: tabIndicatorStrokeWidths.mediumHorizontal,
      left: tabIndicatorPadding.mediumHorizontal,
      right: tabIndicatorPadding.mediumHorizontal,
    },
  },
  mediumVertical: {
    ':after': {
      bottom: tabIndicatorPadding.mediumVertical,
      ...shorthands.borderWidth(`calc(${tabIndicatorStrokeWidths.mediumVertical} / 2.0 `),
      left: 0,
      top: tabIndicatorPadding.mediumVertical,
      width: tabIndicatorStrokeWidths.mediumVertical,
    },
  },
  smallHorizontal: {
    ':after': {
      bottom: 0,
      ...shorthands.borderWidth(`calc(${tabIndicatorStrokeWidths.smallHorizontal} / 2.0 `),
      height: tabIndicatorStrokeWidths.smallHorizontal,
      left: tabIndicatorPadding.smallHorizontal,
      right: tabIndicatorPadding.smallHorizontal,
    },
  },
  smallVertical: {
    ':after': {
      bottom: tabIndicatorPadding.smallVertical,
      ...shorthands.borderWidth(`calc(${tabIndicatorStrokeWidths.smallVertical} / 2.0 `),
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

  const { appearance, selectedValue, size, value, vertical } = state;
  const selected = selectedValue === value;

  state.root.className = mergeClasses(
    tabSlotClassNames.root,
    rootStyles.base,
    focusStyles.base,
    appearance === 'subtle' && rootStyles.subtle,
    size !== 'small' && (vertical ? rootStyles.mediumVertical : rootStyles.mediumHorizontal),
    size === 'small' && (vertical ? rootStyles.smallVertical : rootStyles.smallHorizontal),
    selected && rootStyles.selected,

    // pending indicator (before pseudo element)
    pendingIndicatorStyles.base,
    size !== 'small' && (vertical ? pendingIndicatorStyles.mediumVertical : pendingIndicatorStyles.mediumHorizontal),
    size === 'small' && (vertical ? pendingIndicatorStyles.smallVertical : pendingIndicatorStyles.smallHorizontal),

    // active indicator (after pseudo element)
    selected && activeIndicatorStyles.base,
    selected &&
      size !== 'small' &&
      (vertical ? activeIndicatorStyles.mediumVertical : activeIndicatorStyles.mediumHorizontal),
    selected &&
      size === 'small' &&
      (vertical ? activeIndicatorStyles.smallVertical : activeIndicatorStyles.smallHorizontal),
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(
      tabSlotClassNames.icon,
      iconStyles.base,
      iconStyles[size],
      state.icon.className,
    );
  }

  state.content.className = mergeClasses(
    tabSlotClassNames.content,
    contentStyles.base,
    selected && contentStyles.selected,
    state.content.className,
  );

  return state;
};
