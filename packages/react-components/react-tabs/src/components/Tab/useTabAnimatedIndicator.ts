import * as React from 'react';
import type { TabState, TabValue } from './Tab.types';

import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { pendingAnimationDurationTokens, pendingAnimationEasingTokens } from '../../tab.constants';
import { useContextSelector } from '@fluentui/react-context-selector';
import { TabListContext } from '../TabList/TabListContext';
import { TabRegisterData } from '../TabList/TabList.types';

// eslint-disable-next-line @typescript-eslint/naming-convention
const tabIndicatorCssVars_unstable = {
  offsetVar: '--fui-Tab__indicator--offset',
  scaleVar: '--fui-Tab__indicator--scale',
};

const useActiveIndicatorStyles = makeStyles({
  base: {
    // overflow is required to allow the selection indicator to animate outside the tab area.
    ...shorthands.overflow('visible'),
  },
  animated: {
    ':after': {
      transitionProperty: 'transform',
      transitionDuration: `${pendingAnimationDurationTokens.slow}`,
      transitionTimingFunction: `${pendingAnimationEasingTokens.declerateMax}`,
    },
    '@media (prefers-reduced-motion: reduce)': {
      ':after': {
        transitionProperty: 'none',
        transitionDuration: '0.01ms',
      },
    },
  },
  horizontal: {
    ':after': {
      transformOrigin: 'left',
      transform: `translateX(var(${tabIndicatorCssVars_unstable.offsetVar}))
    scaleX(var(${tabIndicatorCssVars_unstable.scaleVar}))`,
    },
  },
  vertical: {
    ':after': {
      transformOrigin: 'top',
      transform: `translateY(var(${tabIndicatorCssVars_unstable.offsetVar}))
        scaleY(var(${tabIndicatorCssVars_unstable.scaleVar}))`,
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

const getRegisteredTabRect = (registeredTabs: Record<string, TabRegisterData>, value?: TabValue) => {
  const element = value ? registeredTabs[JSON.stringify(value)]?.ref.current : undefined;
  return element ? calculateTabRect(element) : undefined;
};

/**
 * Adds additional styling to the active tab selection indicator to create a sliding animation.
 */
export const useTabAnimatedIndicatorStyles_unstable = (state: TabState): TabState => {
  const { disabled, selected, vertical } = state;

  const activeIndicatorStyles = useActiveIndicatorStyles();
  const [lastAnimatedFrom, setLastAnimatedFrom] = React.useState<TabValue>();
  const [animationValues, setAnimationValues] = React.useState({ offset: 0, scale: 1 });
  const getRegisteredTabs = useContextSelector(TabListContext, ctx => ctx.getRegisteredTabs);

  React.useEffect(() => {
    if (lastAnimatedFrom) {
      setAnimationValues({ offset: 0, scale: 1 });
    }
  }, [lastAnimatedFrom]);

  if (selected) {
    const { previousSelectedValue, selectedValue, registeredTabs } = getRegisteredTabs();
    const previousSelectedTabRect = getRegisteredTabRect(registeredTabs, previousSelectedValue);
    const selectedTabRect = getRegisteredTabRect(registeredTabs, selectedValue);

    if (
      selectedTabRect &&
      previousSelectedTabRect &&
      previousSelectedValue &&
      lastAnimatedFrom !== previousSelectedValue
    ) {
      const offset = vertical
        ? previousSelectedTabRect.y - selectedTabRect.y
        : previousSelectedTabRect.x - selectedTabRect.x;

      const scale = vertical
        ? previousSelectedTabRect.height / selectedTabRect.height
        : previousSelectedTabRect.width / selectedTabRect.width;

      setAnimationValues({ offset, scale });
      setLastAnimatedFrom(previousSelectedValue);
    }
  } else if (lastAnimatedFrom) {
    // need to clear the last animated from so that if this tab is selected again
    // from the same previous tab as last time, that animation still happens.
    setLastAnimatedFrom(undefined);
  }

  // do not apply any animation if the tab is disabled
  if (disabled) {
    return state;
  }

  // the animation should only happen as the selection indicator returns to its
  // original position and not when set at the previous tabs position.
  const animating = animationValues.offset === 0 && animationValues.scale === 1;

  state.root.className = mergeClasses(
    state.root.className,
    selected && activeIndicatorStyles.base,
    selected && animating && activeIndicatorStyles.animated,
    selected && (vertical ? activeIndicatorStyles.vertical : activeIndicatorStyles.horizontal),
  );

  const rootCssVars = {
    [tabIndicatorCssVars_unstable.offsetVar]: `${animationValues.offset}px`,
    [tabIndicatorCssVars_unstable.scaleVar]: `${animationValues.scale}`,
  };

  state.root.style = {
    ...rootCssVars,
    ...state.root.style,
  };

  return state;
};
