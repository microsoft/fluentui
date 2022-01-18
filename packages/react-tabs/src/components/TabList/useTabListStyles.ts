import * as React from 'react';
import { makeStyles, mergeClasses, shorthands } from '@fluentui/react-make-styles';
import type { TabListState } from './TabList.types';
import { tokens } from '@fluentui/react-theme';
import { usePrevious } from '@fluentui/react-utilities';

export const tabListClassName = 'fui-TabList';
export const tabListSelectionIndicatorName = 'fui-TabList_SelectionIndicator';

export const indicatorLeftVar = '--fui-tab-list-indicator-left';
export const indicatorTopVar = '--fui-tab-list-indicator-top';
export const indicatorRightVar = '--fui-tab-list-indicator-right';
export const indicatorBottomVar = '--fui-tab-list-indicator-bottom';
export const indicatorWidthVar = '--fui-tab-list-indicator-width';
export const indicatorHeightVar = '--fui-tab-list-indicator-height';

export const indicatorTransitionDurationVar = '--fui-tab-list-indicator-transition-duration';

// TODO: These constants should be replaced with design tokens
const pendingTheme = {
  tabPadding: {
    medium: '10px',
    small: '6px',
  },
  indicatorThickness: '3px',
  gap: { medium: '6px', small: '2px' },
  contentPadding: {
    medium: '2px',
    small: '2px',
  },
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
  },
  vertical: {
    flexDirection: 'column',
  },
});

/**
 * Indicator styles for the root slot when horizontal.
 */
const useHorizontalIndicatorStyles = makeStyles({
  base: {
    backgroundColor: tokens.colorBrandStroke1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    boxSizing: 'border-box',
    position: 'absolute',
    bottom: 0,
    left: `calc(var(${indicatorLeftVar}) + ${pendingTheme.tabPadding.medium})`,
    width: `calc(var(${indicatorWidthVar}) - (2 * ${pendingTheme.tabPadding.medium}))`,
    height: pendingTheme.indicatorThickness,
    transitionProperty: 'left, width',
    transitionDuration: `var(${indicatorTransitionDurationVar}), var(${indicatorTransitionDurationVar})}`,
    ':hover': {
      backgroundColor: tokens.colorNeutralStroke1,
    },
  },
  selected: {
    backgroundColor: tokens.colorBrandStroke1,
    ':hover': {
      backgroundColor: tokens.colorBrandStroke1,
    },
  },
  small: {
    left: pendingTheme.tabPadding.small,
    right: pendingTheme.tabPadding.small,
  },
});

/**
 * Apply styling to the TabList slots based on the state
 */
export const useTabListStyles = (state: TabListState): TabListState => {
  const { selectionIndicatorRect, selectedValue } = state;

  // only animate when the selected value has changed
  const previousSelectedValue = usePrevious(selectedValue);
  const shouldAnimate = previousSelectedValue && previousSelectedValue !== selectedValue;

  const styles = useStyles();
  const horizontalIndicatorStyles = useHorizontalIndicatorStyles();

  state.root.className = mergeClasses(
    tabListClassName,
    styles.root,
    state.vertical && styles.vertical,
    state.root.className,
  );

  state.selectionIndicator.className = mergeClasses(
    tabListSelectionIndicatorName,
    horizontalIndicatorStyles.base,
    state.selectionIndicator?.className,
  );

  const selectionVariables = {
    [indicatorLeftVar]: `${selectionIndicatorRect?.left || 0}px`,
    [indicatorWidthVar]: `${selectionIndicatorRect?.width || 0}px`,
    [indicatorTransitionDurationVar]: shouldAnimate ? '350ms' : '0ms',
  };

  state.selectionIndicator.style = {
    ...selectionVariables,
    ...state.selectionIndicator.style,
  };

  return state;
};
