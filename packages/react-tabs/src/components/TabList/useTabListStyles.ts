import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { TabListSlots, TabListState } from './TabList.types';
import { tokens } from '@fluentui/react-theme';
import { SlotClassNames, usePrevious } from '@fluentui/react-utilities';
import { tabPendingDesignTokens } from '../../tab.constants';

/**
 * @deprecated Use `tabListClassNames.root` instead.
 */
export const tabListClassName = 'fui-TabList';
export const tabListSelectionIndicatorName = 'fui-TabList__selectionIndicator';
export const tabListClassNames: SlotClassNames<TabListSlots> = {
  root: 'fui-TabList',
};

export const indicatorOffsetVar = '--selection-indicator-offset';
export const indicatorLengthVar = '--selection-indicator-length';

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
    ':after': {
      backgroundColor: tokens.colorBrandStroke1,
      ...shorthands.borderRadius(tokens.borderRadiusMedium),
      bottom: 0,
      boxSizing: 'border-box',
      content: '""',
      height: tabPendingDesignTokens.indicatorThickness,
      left: `calc(var(${indicatorOffsetVar}) + ${tabPendingDesignTokens.tabPadding.medium})`,
      position: 'absolute',
      width: `calc(var(${indicatorLengthVar}) - (2 * ${tabPendingDesignTokens.tabPadding.medium}))`,
      zIndex: 1,
    },
  },
  small: {
    ':after': {
      left: `calc(var(${indicatorOffsetVar}) + ${tabPendingDesignTokens.tabPadding.small})`,
      width: `calc(var(${indicatorLengthVar}) - (2 * ${tabPendingDesignTokens.tabPadding.small}))`,
    },
  },
  animated: {
    ':after': {
      transitionProperty: 'left, width',
      transitionDuration: `350ms, 350ms`,
    },
  },
});

/**
 * Styles for the selection indicator slot when vertical.
 */
const useVerticalIndicatorStyles = makeStyles({
  base: {
    ':before': {
      backgroundColor: tokens.colorBrandStroke1,
      ...shorthands.borderRadius(tokens.borderRadiusMedium),
      boxSizing: 'border-box',
      content: '""',
      height: `calc(var(${indicatorLengthVar}) - (2 * ${tabPendingDesignTokens.tabPadding.medium}))`,
      left: '0',
      position: 'absolute',
      top: `calc(var(${indicatorOffsetVar}) + ${tabPendingDesignTokens.tabPadding.medium})`,
      width: tabPendingDesignTokens.indicatorThickness,
      zIndex: 1,
    },
  },
  small: {
    ':before': {
      top: `calc(var(${indicatorOffsetVar}) + ${tabPendingDesignTokens.tabPadding.small})`,
      height: `calc(var(${indicatorLengthVar}) - (2 * ${tabPendingDesignTokens.tabPadding.small}))`,
    },
  },
  animated: {
    ':before': {
      transitionProperty: 'top, height',
      transitionDuration: `350ms, 350ms`,
    },
  },
});

/**
 * Apply styling to the TabList slots based on the state
 */
export const useTabListStyles_unstable = (state: TabListState): TabListState => {
  const { selectedTabRect: selectionIndicatorRect, selectedValue, size, vertical } = state;

  // only animate when the selected value has changed
  const previousSelectedValue = usePrevious(selectedValue);
  const shouldAnimate = !!previousSelectedValue && previousSelectedValue !== selectedValue;

  const styles = useStyles();
  const horizontalIndicatorStyles = useHorizontalIndicatorStyles();
  const verticalIndicatorStyles = useVerticalIndicatorStyles();

  state.root.className = mergeClasses(
    tabListClassNames.root,
    styles.root,
    vertical && styles.vertical,
    !!selectedValue && (vertical ? verticalIndicatorStyles.base : horizontalIndicatorStyles.base),
    !!selectedValue && size === 'small' && (vertical ? verticalIndicatorStyles.small : horizontalIndicatorStyles.small),
    !!selectedValue &&
      shouldAnimate &&
      (vertical ? verticalIndicatorStyles.animated : horizontalIndicatorStyles.animated),
    state.root.className,
  );

  const rootCssVars = selectionIndicatorRect
    ? {
        [indicatorOffsetVar]: vertical ? `${selectionIndicatorRect.y}px` : `${selectionIndicatorRect.x}px`,
        [indicatorLengthVar]: vertical ? `${selectionIndicatorRect.height}px` : `${selectionIndicatorRect.width}px`,
      }
    : {};

  state.root.style = {
    ...rootCssVars,
    ...state.root.style,
  };

  return state;
};
