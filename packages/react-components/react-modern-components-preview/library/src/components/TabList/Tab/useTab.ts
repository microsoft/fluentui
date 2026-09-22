'use client';

import * as React from 'react';
import { useTab as useTabBase } from '@fluentui/react-headless-components-preview/tab-list';
import { omit, slot, useAnimationFrame } from '@fluentui/react-utilities';
import { useTabListVisualContext } from '../TabList/TabListContext';
import type { TabProps, TabState, TabValue } from './Tab.types';

const indicatorOffsetVar = '--fui-Tab__indicator--offset';
const indicatorScaleVar = '--fui-Tab__indicator--scale';

const isValueDefined = (value: TabValue): boolean => value !== null && value !== undefined;

export const useTab = (props: TabProps, ref: React.Ref<HTMLElement>): TabState => {
  'use no memo';

  const state = useTabBase(props, ref);
  const { appearance, getRegisteredTabs, reserveSelectedTabSpace, size } = useTabListVisualContext();
  const content = props.content;
  const contentReservedSpace =
    content && typeof content === 'object' ? omit(content, ['ref' as keyof typeof content]) : content;
  const [lastAnimatedFrom, setLastAnimatedFrom] = React.useState<TabValue>();
  const [animationValues, setAnimationValues] = React.useState({ offset: 0, scale: 1 });
  const [requestAnimationFrame] = useAnimationFrame();

  if (state.selected) {
    const { previousSelectedValue, selectedValue, registeredTabs } = getRegisteredTabs();

    if (isValueDefined(previousSelectedValue) && lastAnimatedFrom !== previousSelectedValue) {
      const previousElement = registeredTabs[JSON.stringify(previousSelectedValue)]?.ref.current;
      const selectedElement = registeredTabs[JSON.stringify(selectedValue)]?.ref.current;

      if (previousElement && selectedElement) {
        const parentRect = selectedElement.parentElement?.getBoundingClientRect() ?? { x: 0, y: 0 };
        const previousRect = previousElement.getBoundingClientRect();
        const selectedRect = selectedElement.getBoundingClientRect();
        const offset = state.vertical
          ? previousRect.y - parentRect.y - (selectedRect.y - parentRect.y)
          : previousRect.x - parentRect.x - (selectedRect.x - parentRect.x);
        const scale = state.vertical
          ? previousRect.height / selectedRect.height
          : previousRect.width / selectedRect.width;

        setAnimationValues({ offset, scale });
        setLastAnimatedFrom(previousSelectedValue);
        requestAnimationFrame(() => setAnimationValues({ offset: 0, scale: 1 }));
      }
    }
  } else if (isValueDefined(lastAnimatedFrom)) {
    setLastAnimatedFrom(undefined);
  }

  const animateIndicator =
    !state.disabled && state.selected && animationValues.offset === 0 && animationValues.scale === 1;
  const indicatorStyle = {
    [indicatorOffsetVar]: `${animationValues.offset}px`,
    [indicatorScaleVar]: animationValues.scale,
  } as React.CSSProperties;

  return {
    ...state,
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...state.components,
      contentReservedSpace: 'span',
    },
    contentReservedSpace: slot.optional(contentReservedSpace, {
      renderByDefault: !state.selected && !state.iconOnly && reserveSelectedTabSpace,
      defaultProps: { children: props.children },
      elementType: 'span',
    }) as TabState['contentReservedSpace'],
    root: {
      ...state.root,
      style: { ...indicatorStyle, ...state.root.style },
      'data-animate-indicator': animateIndicator ? '' : undefined,
      'data-appearance': appearance,
      'data-orientation': state.vertical ? 'vertical' : 'horizontal',
      'data-size': size,
    },
    appearance,
    size,
  };
};
