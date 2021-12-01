import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';

import type { TabState } from './Tab.types';

export const tabClassName = 'fui-Tab';

const indicatorThickness = '2px';

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  base: theme => ({
    background: 'none',
    borderColor: 'none',
    borderRadius: theme.borderRadiusMedium,
    borderWidth: theme.strokeWidthThin,
    columnGap: '6px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    fontFamily: theme.fontFamilyBase,
    fontSize: theme.fontSizeBase300,
    lineHeight: theme.lineHeightBase300,
    padding: '12px',
    position: 'relative',
    overflow: 'hidden',
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
    padding: '6px',
    columnGap: '2px',
  },
  subtle: theme => ({
    ':hover': {
      background: theme.colorNeutralBackground1Hover,
    },
  }),
});

const useFocusStyles = makeStyles({
  base: createCustomFocusIndicatorStyle(theme => ({
    borderColor: 'transparent',
    outline: '2px solid transparent',
    boxShadow: `
      ${theme.shadow4},
      0 0 0 2px ${theme.colorStrokeFocus2}
    `,
    zIndex: 1,
  })),
});

/**
 * While the indicator is applied to the root it is thought of as a separate element
 * since it uses :after and absolute positioning.
 * The horizontal and vertical indicators are separated since are styled independently.
 */
const useHorizontalIndicatorStyles = makeStyles({
  base: theme => ({
    ':after': {
      background: 'none',
      borderRadius: theme.borderRadiusMedium,
      boxSizing: 'border-box',
      content: '""',
      position: 'absolute',
      height: indicatorThickness,
      bottom: '0',
      left: '12px',
      right: '12px',
    },
    ':hover': {
      ':after': {
        background: theme.colorNeutralStroke1,
      },
    },
  }),
  selected: theme => ({
    ':after': {
      background: theme.colorBrandStroke1,
    },
    ':hover': {
      ':after': {
        background: theme.colorBrandStroke1,
      },
    },
  }),
  small: {
    ':after': {
      left: '6px',
      right: '6px',
    },
  },
});

/**
 * While the indicator is applied to the root it is thought of as a separate element
 * since it uses :before and absolute positioning.
 * The horizontal and vertical indicators are separated since are styled independently.
 */
const useVerticalIndicatorStyles = makeStyles({
  base: theme => ({
    ':before': {
      background: 'none',
      borderRadius: theme.borderRadiusMedium,
      boxSizing: 'border-box',
      content: '""',
      position: 'absolute',
      width: indicatorThickness,
      left: '0px',
      top: '12px',
      bottom: '12px',
    },
    ':hover': {
      ':before': {
        background: theme.colorNeutralStroke1,
      },
    },
  }),
  selected: theme => ({
    ':before': {
      background: theme.colorBrandStroke1,
    },
    ':hover': {
      ':before': {
        background: theme.colorBrandStroke1,
      },
    },
  }),
  small: {
    ':before': {
      top: '6px',
      bottom: '6px',
    },
  },
});

const useIconStyles = makeStyles({
  base: {
    alignItems: 'center',
    display: 'inline-flex',
    justifyContent: 'center',
  },
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
 * Apply styling to the Tab slots based on the state
 */
export const useTabStyles = (state: TabState): TabState => {
  const rootStyles = useRootStyles();
  const focusStyles = useFocusStyles();
  const horizontalIndicatorStyles = useHorizontalIndicatorStyles();
  const verticalIndicatorStyles = useVerticalIndicatorStyles();
  const iconStyles = useIconStyles();

  console.log('selected', state.selected);

  state.root.className = mergeClasses(
    tabClassName,
    rootStyles.base,
    focusStyles.base,
    state.appearance === 'subtle' && rootStyles.subtle,
    state.vertical ? verticalIndicatorStyles.base : horizontalIndicatorStyles.base,
    state.size === 'small' && (state.vertical ? verticalIndicatorStyles.small : horizontalIndicatorStyles.small),
    state.selected && (state.vertical ? verticalIndicatorStyles.selected : horizontalIndicatorStyles.selected),
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(iconStyles.base, iconStyles[state.size], state.icon.className);
  }

  return state;
};
