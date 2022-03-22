import type { TabSlots, TabState } from './Tab.types';

import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import { tabContentSizes, tabSpacingTokens } from '../../tab.constants';
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
    backgroundColor: 'transparent',
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
  medium: {
    columnGap: tabSpacingTokens.sNudge,
  },
  small: {
    columnGap: tabSpacingTokens.xxs,
  },
  mediumHorizontal: {
    justifyContent: 'center',
    ...shorthands.padding(tabSpacingTokens.m, tabSpacingTokens.sNudge),
  },
  mediumVertical: {
    justifyContent: 'flex-start',
    minWidth: '120px',
    ...shorthands.padding(tabSpacingTokens.mNudge),
  },
  smallHorizontal: {
    ...shorthands.padding(tabSpacingTokens.sNudge),
  },
  smallVertical: {},
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
      ...shorthands.borderRadius(tokens.borderRadiusCircular),
      boxSizing: 'border-box',
      content: '""',
      position: 'absolute',
    },
    ':hover:before': {
      backgroundColor: tokens.colorNeutralStroke1,
    },
    ':active:before': {
      backgroundColor: tokens.colorNeutralStroke1,
    },
  },
  mediumHorizontal: {
    ':before': {
      height: tokens.strokeWidthThicker,
      bottom: 0,
      left: tabSpacingTokens.m,
      right: tabSpacingTokens.m,
    },
  },
  mediumVertical: {
    ':before': {
      height: '16px',
      left: 0,
      top: tabSpacingTokens.s,
      width: tokens.strokeWidthThicker,
    },
    ':hover:before': {
      left: 0,
    },
    ':active:before': {
      left: 0,
    },
  },
  smallHorizontal: {
    ':before': {
      height: tokens.strokeWidthThick,
      bottom: 0,
      left: tabSpacingTokens.sNudge,
      right: tabSpacingTokens.sNudge,
    },
  },
  smallVertical: {
    ':before': {
      height: '12px',
      left: 0,
      width: tokens.strokeWidthThicker,
    },
    ':hover:before': {
      left: 0,
    },
    ':active:before': {
      left: 0,
    },
  },
});

const useActiveIndicatorStyles = makeStyles({
  base: {
    ':after': {
      backgroundColor: tokens.colorCompoundBrandForeground1,
      ...shorthands.borderRadius(tokens.borderRadiusCircular),
      boxSizing: 'border-box',
      content: '""',
      position: 'absolute',
    },
  },
  mediumHorizontal: {
    ':after': {
      height: tokens.strokeWidthThicker,
      bottom: '0',
      left: tabSpacingTokens.m,
      right: tabSpacingTokens.m,
    },
    ':hover:after': {
      left: tabSpacingTokens.sNudge,
      right: tabSpacingTokens.sNudge,
    },
    ':active:after': {
      left: tabSpacingTokens.sNudge,
      right: tabSpacingTokens.sNudge,
    },
  },
  mediumVertical: {
    ':after': {
      left: 0,
      height: '16px',
      top: tabSpacingTokens.s,
      width: tokens.strokeWidthThicker,
    },
    ':hover:after': {
      height: '20px',
      left: 0,
      top: tabSpacingTokens.sNudge,
    },
    ':active:after': {
      height: '20px',
      left: 0,
      top: tabSpacingTokens.sNudge,
    },
  },
  smallHorizontal: {
    ':after': {
      bottom: '0',
      height: tokens.strokeWidthThick,
      left: tabSpacingTokens.sNudge,
      right: tabSpacingTokens.sNudge,
    },
    ':hover:after': {
      left: tabSpacingTokens.xs,
      right: tabSpacingTokens.xs,
    },
    ':active:after': {
      left: tabSpacingTokens.xs,
      right: tabSpacingTokens.xs,
    },
  },
  smallVertical: {
    ':after': {
      height: '12px',
      left: '0',
      top: 0,
      bottom: tabSpacingTokens.sNudge,
      width: tokens.strokeWidthThicker,
    },
    ':hover:after': {
      height: '16px',
      left: 0,
    },
    ':active:after': {
      height: '16px',
      left: 0,
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
    ...tabContentSizes.body1,
    ...shorthands.padding(0, tabSpacingTokens.xxs),
  },
  selected: {
    ...tabContentSizes.body1Strong,
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

  state.root.className = mergeClasses(
    tabSlotClassNames.root,

    // root
    rootStyles.base,
    focusStyles.base,
    state.appearance === 'subtle' && rootStyles.subtle,
    state.size === 'small' ? rootStyles.small : rootStyles.medium,
    state.size !== 'small' && (state.vertical ? rootStyles.mediumVertical : rootStyles.mediumHorizontal),
    state.size === 'small' && (state.vertical ? rootStyles.smallVertical : rootStyles.smallHorizontal),
    state.selected && rootStyles.selected,

    // pending indicator
    !state.selected && pendingIndicatorStyles.base,
    !state.selected &&
      state.size !== 'small' &&
      (state.vertical ? pendingIndicatorStyles.mediumVertical : pendingIndicatorStyles.mediumHorizontal),
    !state.selected &&
      state.size === 'small' &&
      (state.vertical ? pendingIndicatorStyles.smallVertical : pendingIndicatorStyles.smallHorizontal),

    // active indicator
    state.selected && activeIndicatorStyles.base,
    state.selected &&
      state.size !== 'small' &&
      (state.vertical ? activeIndicatorStyles.mediumVertical : activeIndicatorStyles.mediumHorizontal),
    state.selected &&
      state.size === 'small' &&
      (state.vertical ? activeIndicatorStyles.smallVertical : activeIndicatorStyles.smallHorizontal),

    state.root.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(
      tabSlotClassNames.icon,
      iconStyles.base,
      iconStyles[state.size],
      state.icon.className,
    );
  }

  state.content.className = mergeClasses(
    tabSlotClassNames.content,
    contentStyles.base,
    state.selected && contentStyles.selected,
    state.content.className,
  );

  return state;
};
