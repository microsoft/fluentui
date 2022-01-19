import { makeStyles, mergeClasses, shorthands } from '@fluentui/react-make-styles';
import type { TabListState } from './TabList.types';
import { tokens } from '@fluentui/react-theme';
import { usePrevious } from '@fluentui/react-utilities';
import { tabPendingDesignTokens } from '../../tab.constants';

export const tabListClassName = 'fui-TabList';
export const tabListSelectionIndicatorName = 'fui-TabList_SelectionIndicator';

export const indicatorDisplayVar = '--fui-tab-list-indicator-display';
export const indicatorLeftVar = '--fui-tab-list-indicator-left';
export const indicatorWidthVar = '--fui-tab-list-indicator-width';
export const indicatorTopVar = '--fui-tab-list-indicator-top';
export const indicatorHeightVar = '--fui-tab-list-indicator-height';
export const indicatorTransitionDurationVar = '--fui-tab-list-indicator-transition-duration';

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
 * Styles for the selection indicator slot when horizontal.
 */
const useHorizontalIndicatorStyles = makeStyles({
  base: {
    backgroundColor: tokens.colorBrandStroke1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    bottom: 0,
    boxSizing: 'border-box',
    display: `var(${indicatorDisplayVar})`,
    height: tabPendingDesignTokens.indicatorThickness,
    left: `calc(var(${indicatorLeftVar}) + ${tabPendingDesignTokens.tabPadding.medium})`,
    position: 'absolute',
    transitionProperty: 'left, width',
    transitionDuration: `var(${indicatorTransitionDurationVar}), var(${indicatorTransitionDurationVar})}`,
    ':hover': {
      backgroundColor: tokens.colorNeutralStroke1,
    },
    width: `calc(var(${indicatorWidthVar}) - (2 * ${tabPendingDesignTokens.tabPadding.medium}))`,
  },
  small: {
    left: `calc(var(${indicatorLeftVar}) + ${tabPendingDesignTokens.tabPadding.small})`,
    width: `calc(var(${indicatorWidthVar}) - (2 * ${tabPendingDesignTokens.tabPadding.small}))`,
  },
});

/**
 * Styles for the selection indicator slot when vertical.
 */
const useVerticalIndicatorStyles = makeStyles({
  base: {
    backgroundColor: tokens.colorBrandStroke1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    boxSizing: 'border-box',
    display: `var(${indicatorDisplayVar})`,
    height: `calc(var(${indicatorHeightVar}) - (2 * ${tabPendingDesignTokens.tabPadding.medium}))`,
    left: '0',
    position: 'absolute',
    top: `calc(var(${indicatorTopVar}) + ${tabPendingDesignTokens.tabPadding.medium})`,
    transitionProperty: 'top, height',
    transitionDuration: `var(${indicatorTransitionDurationVar}), var(${indicatorTransitionDurationVar})}`,
    width: tabPendingDesignTokens.indicatorThickness,
  },
  small: {
    top: `calc(var(${indicatorTopVar}) + ${tabPendingDesignTokens.tabPadding.small})`,
    height: `calc(var(${indicatorHeightVar}) - (2 * ${tabPendingDesignTokens.tabPadding.small}))`,
  },
});

/**
 * Apply styling to the TabList slots based on the state
 */
export const useTabListStyles = (state: TabListState): TabListState => {
  const { selectionIndicatorRect, selectedValue, size, vertical } = state;

  // only animate when the selected value has changed
  const previousSelectedValue = usePrevious(selectedValue);
  const shouldAnimate = previousSelectedValue && previousSelectedValue !== selectedValue;

  const styles = useStyles();
  const horizontalIndicatorStyles = useHorizontalIndicatorStyles();
  const verticalIndicatorStyles = useVerticalIndicatorStyles();

  state.root.className = mergeClasses(tabListClassName, styles.root, vertical && styles.vertical, state.root.className);

  state.selectionIndicator.className = mergeClasses(
    tabListSelectionIndicatorName,
    vertical ? verticalIndicatorStyles.base : horizontalIndicatorStyles.base,
    size === 'small' && (vertical ? verticalIndicatorStyles.small : horizontalIndicatorStyles.small),
    state.selectionIndicator?.className,
  );

  const selectionVariables = {
    [indicatorDisplayVar]: selectedValue ? 'block' : 'none',
    [indicatorLeftVar]: `${selectionIndicatorRect?.left || 0}px`,
    [indicatorHeightVar]: `${selectionIndicatorRect?.height || 0}px`,
    [indicatorTopVar]: `${selectionIndicatorRect?.top || 0}px`,
    [indicatorWidthVar]: `${selectionIndicatorRect?.width || 0}px`,
    [indicatorTransitionDurationVar]: shouldAnimate ? '350ms' : '0ms',
  };

  state.selectionIndicator.style = {
    ...selectionVariables,
    ...state.selectionIndicator.style,
  };

  return state;
};
