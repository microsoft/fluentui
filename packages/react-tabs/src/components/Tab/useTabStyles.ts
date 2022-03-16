import type { TabSlots, TabState } from './Tab.types';

import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import { tabPendingDesignTokens } from '../../tab.constants';
import { SlotClassNames } from '@fluentui/react-utilities';

/**
 * @deprecated Use `tabClassNames.root` instead.
 */
export const tabClassName = 'fui-Tab';
export const tabClassNames: SlotClassNames<TabSlots> = {
  root: 'fui-Tab',
  icon: 'fui-Tab__icon',
  content: 'fui-Tab__content',
};

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  base: {
    backgroundColor: 'none',
    ...shorthands.borderColor('none'),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.borderWidth(tokens.strokeWidthThin),
    columnGap: tabPendingDesignTokens.gap.medium,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    ...shorthands.padding(tabPendingDesignTokens.tabPadding.medium),
    position: 'relative',
    ...shorthands.overflow('hidden'),
  },
  horizontal: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  vertical: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  small: {
    ...shorthands.padding(tabPendingDesignTokens.tabPadding.small),
    columnGap: tabPendingDesignTokens.gap.small,
  },
  subtle: {
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
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

/**
 * Indicator styles for the root slot when horizontal.
 */
const useHorizontalIndicatorStyles = makeStyles({
  base: {
    ':after': {
      backgroundColor: 'none',
      ...shorthands.borderRadius(tokens.borderRadiusMedium),
      boxSizing: 'border-box',
      content: '""',
      position: 'absolute',
      height: tabPendingDesignTokens.indicatorThickness,
      bottom: '0',
      left: tabPendingDesignTokens.tabPadding.medium,
      right: tabPendingDesignTokens.tabPadding.medium,
    },
    ':hover': {
      ':after': {
        backgroundColor: tokens.colorNeutralStroke1,
      },
    },
  },
  small: {
    ':after': {
      left: tabPendingDesignTokens.tabPadding.small,
      right: tabPendingDesignTokens.tabPadding.small,
    },
  },
});

/**
 * Indicator styles for the root slot when vertical.
 */
const useVerticalIndicatorStyles = makeStyles({
  base: {
    ':before': {
      backgroundColor: 'none',
      ...shorthands.borderRadius(tokens.borderRadiusMedium),
      boxSizing: 'border-box',
      content: '""',
      position: 'absolute',
      width: tabPendingDesignTokens.indicatorThickness,
      left: '0',
      top: tabPendingDesignTokens.tabPadding.medium,
      bottom: tabPendingDesignTokens.tabPadding.medium,
    },
    ':hover': {
      ':before': {
        backgroundColor: tokens.colorNeutralStroke1,
      },
    },
  },
  small: {
    ':before': {
      top: tabPendingDesignTokens.tabPadding.small,
      bottom: tabPendingDesignTokens.tabPadding.small,
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
    paddingLeft: tabPendingDesignTokens.contentPadding.medium,
    paddingRight: tabPendingDesignTokens.contentPadding.medium,
  },
  small: {
    paddingLeft: tabPendingDesignTokens.contentPadding.small,
    paddingRight: tabPendingDesignTokens.contentPadding.small,
  },
});

/**
 * Apply styling to the Tab slots based on the state
 */
export const useTabStyles_unstable = (state: TabState): TabState => {
  const rootStyles = useRootStyles();
  const focusStyles = useFocusStyles();
  const horizontalIndicatorStyles = useHorizontalIndicatorStyles();
  const verticalIndicatorStyles = useVerticalIndicatorStyles();
  const iconStyles = useIconStyles();
  const contentStyles = useContentStyles();

  state.root.className = mergeClasses(
    tabClassNames.root,
    rootStyles.base,
    focusStyles.base,
    state.size === 'small' && rootStyles.small,
    state.appearance === 'subtle' && rootStyles.subtle,
    state.vertical ? verticalIndicatorStyles.base : horizontalIndicatorStyles.base,
    state.size === 'small' && (state.vertical ? verticalIndicatorStyles.small : horizontalIndicatorStyles.small),
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(
      tabClassNames.icon,
      iconStyles.base,
      iconStyles[state.size],
      state.icon.className,
    );
  }

  state.content.className = mergeClasses(
    tabClassNames.content,
    contentStyles.base,
    state.size === 'small' && contentStyles.small,
    state.content.className,
  );

  return state;
};
