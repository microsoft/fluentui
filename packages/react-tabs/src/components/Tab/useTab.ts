import * as React from 'react';
import { getNativeElementProps, useEventCallback } from '@fluentui/react-utilities';
import type { TabProps, TabSlots, TabState } from './Tab.types';
import { TabListContext } from '../TabList/TabListContext';
import { useContextSelector } from '@fluentui/react-context-selector';
import { SelectTabEvent } from '../TabList/TabList.types';

/**
 * Array of all shorthand properties listed in TabSlots
 */
export const tabShorthandProps: (keyof TabSlots)[] = ['root'];

/**
 * Create the state required to render Tab.
 *
 * The returned state can be modified with hooks such as useTabStyles,
 * before being passed to renderTab.
 *
 * @param props - props from this instance of Tab
 * @param ref - reference to root HTMLElement of Tab
 */
export const useTab = (props: TabProps, ref: React.Ref<HTMLElement>): TabState => {
  const { value } = props;

  const selected = useContextSelector(TabListContext, ctx => ctx.selectedKey === value);
  const selectTab = useContextSelector(TabListContext, ctx => ctx.selectTab);
  const verticalContent = useContextSelector(TabListContext, ctx => !!ctx.verticalTabContent);
  const verticalList = useContextSelector(TabListContext, ctx => !!ctx.vertical);

  const onClick = useEventCallback((event: SelectTabEvent) => selectTab(event, { value }));

  return {
    components: {
      root: 'div',
    },
    root: getNativeElementProps('div', {
      ref,
      ...props,
      onClick,
    }),
    selected,
    value,
    verticalContent,
    verticalList,
  };
};
