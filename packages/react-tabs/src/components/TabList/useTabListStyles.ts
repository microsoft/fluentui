import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { TabListState } from './TabList.types';
import { tokens } from '@fluentui/react-theme';
import { usePrevious } from '@fluentui/react-utilities';
import { tabAnimationDurationTokens, tabAnimationEasingTokens, tabPendingSpacingTokens } from '../../tab.constants';

export const tabListClassName = 'fui-TabList';
export const tabListSelectionIndicatorName = 'fui-TabList_SelectionIndicator';

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
      ...shorthands.borderRadius(tokens.borderRadiusCircular),
      bottom: 0,
      boxSizing: 'border-box',
      content: '""',
      height: tokens.strokeWidthThicker,
      left: `calc(var(${indicatorOffsetVar}) + ${tabPendingSpacingTokens.m})`,
      position: 'absolute',
      width: `calc(var(${indicatorLengthVar}) - (2 * ${tabPendingSpacingTokens.m}))`,
      zIndex: 1,
    },
  },
  small: {
    ':after': {
      height: tokens.strokeWidthThick,
      left: `calc(var(${indicatorOffsetVar}) + ${tabPendingSpacingTokens.s})`,
      width: `calc(var(${indicatorLengthVar}) - (2 * ${tabPendingSpacingTokens.s}))`,
    },
  },
  animated: {
    ':after': {
      transitionProperty: 'left, width',
      transitionDuration: `${tabAnimationDurationTokens.slow}, ${tabAnimationDurationTokens.slow}`,
      transitionTimingFunction: `${tabAnimationEasingTokens.easyEase}, ${tabAnimationEasingTokens.easyEase}`,
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
      ...shorthands.borderRadius(tokens.borderRadiusCircular),
      boxSizing: 'border-box',
      content: '""',
      height: `calc(var(${indicatorLengthVar}) - (2 * ${tabPendingSpacingTokens.m}))`,
      left: '0',
      position: 'absolute',
      top: `calc(var(${indicatorOffsetVar}) + ${tabPendingSpacingTokens.m})`,
      width: tokens.strokeWidthThicker,
      zIndex: 1,
    },
  },
  small: {
    ':before': {
      top: `calc(var(${indicatorOffsetVar}) + ${tabPendingSpacingTokens.s})`,
      height: `calc(var(${indicatorLengthVar}) - (2 * ${tabPendingSpacingTokens.s}))`,
      width: tokens.strokeWidthThick,
    },
  },
  animated: {
    ':before': {
      transitionProperty: 'top, height',
      transitionDuration: `${tabAnimationDurationTokens.slow}, ${tabAnimationDurationTokens.slow}`,
      transitionTimingFunction: `${tabAnimationEasingTokens.easyEase}, ${tabAnimationEasingTokens.easyEase}`,
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
    tabListClassName,
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
