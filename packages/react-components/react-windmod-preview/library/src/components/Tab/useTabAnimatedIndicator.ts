'use client';

import * as React from 'react';
import { useAnimationFrame } from '@fluentui/react-utilities';
import type { TabValue } from '@fluentui/react-headless-components-preview/tab-list';

import { useTabListContext } from '../TabList/TabListContext';
import type { TabState } from './Tab.types';

/** Read by the ::after transform in Tab.module.css. */
const indicatorVars = {
  offset: '--fui-tab-indicator-offset',
  scale: '--fui-tab-indicator-scale',
} as const;

const isValueDefined = (value: TabValue) => value !== null && value !== undefined;

/** Positions are taken relative to the shared offset parent so page scroll never leaks in. */
const rectOf = (element: HTMLElement | null | undefined) => {
  if (!element) {
    return undefined;
  }

  const parent = element.parentElement?.getBoundingClientRect() ?? { x: 0, y: 0 };
  const own = element.getBoundingClientRect();

  return { x: own.x - parent.x, y: own.y - parent.y, width: own.width, height: own.height };
};

type TabRootIndicatorAttributes = { 'data-animating'?: true };

/**
 * Slides the selection indicator from the previously selected tab to this one, returning new
 * state. On the render that follows a selection change the indicator is placed back over the
 * previous tab as an offset and a scale; an animation frame later both reset to their resting
 * values and the transition carries the bar across. `data-animating` arms that transition, so it
 * is absent for exactly the one frame that performs the jump — without it the jump would animate
 * too and the bar would visibly travel backwards first.
 */
export const useTabAnimatedIndicator = (state: TabState): TabState => {
  const { disabled, selected, vertical } = state;
  const { getRegisteredTabs } = useTabListContext();
  const [lastAnimatedFrom, setLastAnimatedFrom] = React.useState<TabValue>();
  const [animation, setAnimation] = React.useState({ offset: 0, scale: 1 });
  const [requestAnimationFrame] = useAnimationFrame();

  if (selected && getRegisteredTabs) {
    const { previousSelectedValue, selectedValue, registeredTabs } = getRegisteredTabs();

    if (isValueDefined(previousSelectedValue) && lastAnimatedFrom !== previousSelectedValue) {
      const from = rectOf(registeredTabs[JSON.stringify(previousSelectedValue)]?.ref.current);
      const to = rectOf(registeredTabs[JSON.stringify(selectedValue)]?.ref.current);

      if (from && to) {
        setAnimation({
          offset: vertical ? from.y - to.y : from.x - to.x,
          scale: vertical ? from.height / to.height : from.width / to.width,
        });
        setLastAnimatedFrom(previousSelectedValue);
        requestAnimationFrame(() => setAnimation({ offset: 0, scale: 1 }));
      }
    }
  } else if (isValueDefined(lastAnimatedFrom)) {
    setLastAnimatedFrom(undefined);
  }

  if (disabled) {
    return state;
  }

  const resting = animation.offset === 0 && animation.scale === 1;
  const root: TabState['root'] & TabRootIndicatorAttributes = {
    ...state.root,
    'data-animating': resting || undefined,
    style: {
      [indicatorVars.offset]: `${animation.offset}px`,
      [indicatorVars.scale]: `${animation.scale}`,
      ...state.root.style,
    } as React.CSSProperties,
  };

  return { ...state, root };
};
