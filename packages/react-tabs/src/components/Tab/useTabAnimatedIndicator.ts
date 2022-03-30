import * as React from 'react';
import type { TabState, TabValue } from './Tab.types';

import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { pendingAnimationDurationTokens, pendingAnimationEasingTokens, tabIndicatorPadding } from '../../tab.constants';
import { useTimeout } from '@fluentui/react-utilities';
import { useContextSelector } from '@fluentui/react-context-selector';
import { TabListContext } from '../TabList/TabListContext';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const tabIndicatorCssVars_unstable = {
  startOffsetVar: '--fui-Tab__indicator--startOffset',
  endOffsetVar: '--fui-Tab__indicator--endOffset',
};

const useActiveIndicatorStyles = makeStyles({
  base: {
    // overflow is required to allow the selection indicator to animate outside the tab area.
    ...shorthands.overflow('visible'),
  },
  animatedHorizontal: {
    ':after': {
      transitionProperty: 'left, width, right',
      transitionDuration:
        `${pendingAnimationDurationTokens.slow},` +
        `${pendingAnimationDurationTokens.slow},` +
        `${pendingAnimationDurationTokens.slow}`,
      transitionTimingFunction:
        `${pendingAnimationEasingTokens.declerateMax},` +
        `${pendingAnimationEasingTokens.declerateMax},` +
        `${pendingAnimationEasingTokens.declerateMax}`,
    },
    '@media (prefers-reduced-motion: reduce)': {
      ':after': {
        transitionProperty: 'none',
        transitionDuration: '0ms',
      },
    },
  },
  animatedVertical: {
    ':after': {
      transitionProperty: 'top, height, bottom',
      transitionDuration:
        `${pendingAnimationDurationTokens.slow},` +
        `${pendingAnimationDurationTokens.slow},` +
        `${pendingAnimationDurationTokens.slow}`,
      transitionTimingFunction:
        `${pendingAnimationEasingTokens.declerateMax},` +
        `${pendingAnimationEasingTokens.declerateMax},` +
        `${pendingAnimationEasingTokens.declerateMax}`,
    },
    '@media (prefers-reduced-motion: reduce)': {
      ':after': {
        transitionProperty: 'none',
        transitionDuration: '0ms',
      },
    },
  },
  mediumHorizontal: {
    ':after': {
      left: `calc(var(${tabIndicatorCssVars_unstable.startOffsetVar}) + ${tabIndicatorPadding.mediumHorizontal})`,
      right: `calc(var(${tabIndicatorCssVars_unstable.endOffsetVar}) + ${tabIndicatorPadding.mediumHorizontal})`,
    },
  },
  mediumVertical: {
    ':after': {
      top: `calc(var(${tabIndicatorCssVars_unstable.startOffsetVar}) + ${tabIndicatorPadding.mediumVertical})`,
      bottom: `calc(var(${tabIndicatorCssVars_unstable.endOffsetVar}) + ${tabIndicatorPadding.mediumVertical})`,
    },
  },
  smallHorizontal: {
    ':after': {
      left: `calc(var(${tabIndicatorCssVars_unstable.startOffsetVar}) + ${tabIndicatorPadding.smallHorizontal})`,
      right: `calc(var(${tabIndicatorCssVars_unstable.endOffsetVar}) + ${tabIndicatorPadding.smallHorizontal})`,
    },
  },
  smallVertical: {
    ':after': {
      top: `calc(var(${tabIndicatorCssVars_unstable.startOffsetVar}) + ${tabIndicatorPadding.smallVertical})`,
      bottom: `calc(var(${tabIndicatorCssVars_unstable.endOffsetVar}) + ${tabIndicatorPadding.smallVertical})`,
    },
  },
});

const calculateTabRect = (element: HTMLElement) => {
  if (element) {
    const parentRect = element.parentElement?.getBoundingClientRect() || { x: 0, y: 0, width: 0, height: 0 };
    const tabRect = element.getBoundingClientRect();

    return {
      x: tabRect.x - parentRect.x,
      y: tabRect.y - parentRect.y,
      width: tabRect.width,
      height: tabRect.height,
    };
  }
  return undefined;
};

/**
 * Adds additional styling to the active tab selection indicator to create a sliding animation.
 */
export const useTabAnimatedIndicatorStyles_unstable = (state: TabState): TabState => {
  const activeIndicatorStyles = useActiveIndicatorStyles();

  const { disabled, selectedValue, value, vertical } = state;
  const selected = selectedValue === value;

  const { previousSelectedValue, registeredTabs } = useContextSelector(TabListContext, ctx => ({
    previousSelectedValue: ctx.previousSelectedValue,
    registeredTabs: ctx.registeredTabs,
  }));

  const previousSelectedTabRect = React.useMemo(() => {
    const element = registeredTabs[JSON.stringify(previousSelectedValue)]?.ref.current;
    return element ? calculateTabRect(element) : undefined;
  }, [previousSelectedValue, registeredTabs]);

  const selectedTabRect = React.useMemo(() => {
    const element = registeredTabs[JSON.stringify(selectedValue)]?.ref.current;
    return element ? calculateTabRect(element) : undefined;
  }, [selectedValue, registeredTabs]);

  const [lastAnimatedFrom, setLastAnimatedFrom] = React.useState<TabValue>();
  const [setAnimateTimeout] = useTimeout();
  let indicatorStartOffset = 0;
  let indicatorEndOffset = 0;
  if (
    selected &&
    selectedTabRect &&
    previousSelectedTabRect &&
    previousSelectedValue &&
    lastAnimatedFrom !== previousSelectedValue
  ) {
    indicatorStartOffset = vertical
      ? previousSelectedTabRect.y - selectedTabRect.y
      : previousSelectedTabRect.x - selectedTabRect.x;

    indicatorEndOffset = vertical
      ? selectedTabRect.y + selectedTabRect.height - (previousSelectedTabRect.y + previousSelectedTabRect.height)
      : selectedTabRect.x + selectedTabRect.width - (previousSelectedTabRect.x + previousSelectedTabRect.width);

    setAnimateTimeout(() => {
      setLastAnimatedFrom(previousSelectedValue);
    }, 1);
  }

  // need to clear the last animated from so that if this tab is selected again
  // from the same previous tab as last time, that animation still happens.
  if (!selected && lastAnimatedFrom) {
    setLastAnimatedFrom(undefined);
  }

  // the animation should only happen as the selection indicator returns to its
  // original position and not when set at the previous tabs position.
  const animating = indicatorStartOffset === 0 && indicatorEndOffset === 0;

  // do not apply any animation if the tab is disabled
  if (disabled) {
    return state;
  }

  state.root.className = mergeClasses(
    state.root.className,
    selected && activeIndicatorStyles.base,
    animating && (state.vertical ? activeIndicatorStyles.animatedVertical : activeIndicatorStyles.animatedHorizontal),
    selected &&
      state.size !== 'small' &&
      (state.vertical ? activeIndicatorStyles.mediumVertical : activeIndicatorStyles.mediumHorizontal),
    selected &&
      state.size === 'small' &&
      (state.vertical ? activeIndicatorStyles.smallVertical : activeIndicatorStyles.smallHorizontal),
  );

  const rootCssVars = {
    [tabIndicatorCssVars_unstable.startOffsetVar]: `${indicatorStartOffset}px`,
    [tabIndicatorCssVars_unstable.endOffsetVar]: `${indicatorEndOffset}px`,
  };

  state.root.style = {
    ...rootCssVars,
    ...state.root.style,
  };

  return state;
};
