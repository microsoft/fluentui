import type { TabState } from './Tab.types';

import { makeStyles, mergeClasses, shorthands } from '@fluentui/react-make-styles';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';

export const tabClassName = 'fui-Tab';

// TODO: These constants should be replaced with design tokens
const pendingTheme = {
  tabPadding: {
    medium: '10px',
    small: '6px',
  },
  indicatorThickness: '2px',
  gap: { medium: '6px', small: '2px' },
  contentPadding: {
    medium: '2px',
    small: '2px',
  },
};

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  base: theme => ({
    backgroundColor: 'none',
    ...shorthands.borderColor('none'),
    ...shorthands.borderRadius(theme.borderRadiusMedium),
    ...shorthands.borderWidth(theme.strokeWidthThin),
    columnGap: pendingTheme.gap.medium,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    fontFamily: theme.fontFamilyBase,
    fontSize: theme.fontSizeBase300,
    lineHeight: theme.lineHeightBase300,
    ...shorthands.padding(pendingTheme.tabPadding.medium),
    position: 'relative',
    ...shorthands.overflow('hidden'),
  }),
  horizontal: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  vertical: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  small: {
    ...shorthands.padding(pendingTheme.tabPadding.small),
    columnGap: pendingTheme.gap.small,
  },
  subtle: theme => ({
    ':hover': {
      backgroundColor: theme.colorNeutralBackground1Hover,
    },
  }),
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
  base: theme => ({
    ':after': {
      backgroundColor: 'none',
      ...shorthands.borderRadius(theme.borderRadiusMedium),
      boxSizing: 'border-box',
      content: '""',
      position: 'absolute',
      height: pendingTheme.indicatorThickness,
      bottom: '0',
      left: pendingTheme.tabPadding.medium,
      right: pendingTheme.tabPadding.medium,
    },
    ':hover': {
      ':after': {
        backgroundColor: theme.colorNeutralStroke1,
      },
    },
  }),
  selected: theme => ({
    ':after': {
      backgroundColor: theme.colorBrandStroke1,
    },
    ':hover': {
      ':after': {
        backgroundColor: theme.colorBrandStroke1,
      },
    },
  }),
  small: {
    ':after': {
      left: pendingTheme.tabPadding.small,
      right: pendingTheme.tabPadding.small,
    },
  },
});

/**
 * Indicator styles for the root slot when vertical.
 */
const useVerticalIndicatorStyles = makeStyles({
  base: theme => ({
    ':before': {
      backgroundColor: 'none',
      ...shorthands.borderRadius(theme.borderRadiusMedium),
      boxSizing: 'border-box',
      content: '""',
      position: 'absolute',
      width: pendingTheme.indicatorThickness,
      left: '0',
      top: pendingTheme.tabPadding.medium,
      bottom: pendingTheme.tabPadding.medium,
    },
    ':hover': {
      ':before': {
        backgroundColor: theme.colorNeutralStroke1,
      },
    },
  }),
  selected: theme => ({
    ':before': {
      backgroundColor: theme.colorBrandStroke1,
    },
    ':hover': {
      ':before': {
        backgroundColor: theme.colorBrandStroke1,
      },
    },
  }),
  small: {
    ':before': {
      top: pendingTheme.tabPadding.small,
      bottom: pendingTheme.tabPadding.small,
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
    paddingLeft: pendingTheme.contentPadding.medium,
    paddingRight: pendingTheme.contentPadding.medium,
  },
  small: {
    paddingLeft: pendingTheme.contentPadding.small,
    paddingRight: pendingTheme.contentPadding.small,
  },
});

/**
 * Apply styling to the Tab slots based on the state
 */
export const useTabStyles = (state: TabState): TabState => {
  const rootStyles = useRootStyles();
  const focusStyles = useFocusStyles();
  const horizontalIndicatorStyles = useHorizontalIndicatorStyles();
  const verticalIndicatorStyles = useVerticalIndicatorStyles();
  const iconStyles = useIconStyles();
  const contentStyles = useContentStyles();

  state.root.className = mergeClasses(
    tabClassName,
    rootStyles.base,
    focusStyles.base,
    state.size === 'small' && rootStyles.small,
    state.appearance === 'subtle' && rootStyles.subtle,
    state.vertical ? verticalIndicatorStyles.base : horizontalIndicatorStyles.base,
    state.size === 'small' && (state.vertical ? verticalIndicatorStyles.small : horizontalIndicatorStyles.small),
    state.selected && (state.vertical ? verticalIndicatorStyles.selected : horizontalIndicatorStyles.selected),
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(iconStyles.base, iconStyles[state.size], state.icon.className);
  }

  state.content.className = mergeClasses(
    contentStyles.base,
    state.size === 'small' && contentStyles.small,
    state.content.className,
  );

  return state;
};
