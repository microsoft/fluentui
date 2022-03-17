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
    backgroundColor: 'transparent',
    ...shorthands.borderColor('none'),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.borderWidth(0),
    columnGap: tabSpacingTokens.sNudge,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    fontFamily: tokens.fontFamilyBase,
    lineHeight: tokens.lineHeightBase300,
    ...shorthands.padding(tabSpacingTokens.mNudge),
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
    columnGap: tabSpacingTokens.xxs,
    ...shorthands.padding(tabSpacingTokens.sNudge),
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

/**
 * Indicator styles for the root slot when horizontal.
 */
const useHorizontalIndicatorStyles = makeStyles({
  base: {
    ':after': {
      backgroundColor: 'none',
      ...shorthands.borderRadius(tokens.borderRadiusCircular),
      boxSizing: 'border-box',
      content: '""',
      position: 'absolute',
      height: tokens.strokeWidthThicker,
      bottom: '0',
      left: tabSpacingTokens.m,
      right: tabSpacingTokens.m,
    },
    ':hover': {
      ':after': {
        backgroundColor: tokens.colorNeutralStroke1,
      },
    },
  },
  small: {
    ':after': {
      height: tokens.strokeWidthThick,
      left: tabSpacingTokens.s,
      right: tabSpacingTokens.s,
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
      ...shorthands.borderRadius(tokens.borderRadiusCircular),
      boxSizing: 'border-box',
      content: '""',
      position: 'absolute',
      left: '0',
      top: tabSpacingTokens.m,
      bottom: tabSpacingTokens.m,
      width: tokens.strokeWidthThicker,
    },
    ':hover': {
      ':before': {
        backgroundColor: tokens.colorNeutralStroke1,
      },
    },
  },
  small: {
    ':before': {
      top: tabSpacingTokens.s,
      bottom: tabSpacingTokens.s,
      width: tokens.strokeWidthThick,
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
  const horizontalIndicatorStyles = useHorizontalIndicatorStyles();
  const verticalIndicatorStyles = useVerticalIndicatorStyles();
  const iconStyles = useIconStyles();
  const contentStyles = useContentStyles();

  state.root.className = mergeClasses(
    tabSlotClassNames.root,
    rootStyles.base,
    focusStyles.base,
    state.size === 'small' && rootStyles.small,
    state.appearance === 'subtle' && rootStyles.subtle,
    state.selected && rootStyles.selected,
    !state.selected && (state.vertical ? verticalIndicatorStyles.base : horizontalIndicatorStyles.base),
    !state.selected &&
      state.size === 'small' &&
      (state.vertical ? verticalIndicatorStyles.small : horizontalIndicatorStyles.small),
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
