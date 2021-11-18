import * as React from 'react';
import { getNativeElementProps, resolveShorthand, useEventCallback } from '@fluentui/react-utilities';
import type { TabProps, TabSlots, TabState } from './Tab.types';
import { TabListContext } from '../TabList/TabListContext';
import { useContextSelector } from '@fluentui/react-context-selector';
import { SelectTabEvent } from '../TabList/TabList.types';

/**
 * Array of all shorthand properties listed in TabSlots
 */
export const tabShorthandProps: (keyof TabSlots)[] = ['root', 'content', 'icon'];

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
  const { content, icon, value } = props;

  const { appearance, selected, selectTab, size, verticalContent, verticalList } = useContextSelector(
    TabListContext,
    ctx => ({
      appearance: ctx.appearance,
      selected: ctx.selectedValue === value,
      selectTab: ctx.selectTab,
      size: ctx.size,
      verticalContent: !!ctx.verticalTabContent,
      verticalList: !!ctx.vertical,
    }),
  );

  const onClick = useEventCallback((event: SelectTabEvent) => selectTab(event, { value }));

  return {
    components: {
      root: 'div',
      icon: 'span',
      content: 'div',
    },
    root: getNativeElementProps('div', {
      ref,
      role: 'tab',
      tabIndex: 0,
      ...props,
      onClick,
    }),
    content: resolveShorthand(content, { required: true, defaultProps: { children: props.children } }),
    icon: resolveShorthand(icon),
    appearance,
    selected,
    size,
    value,
    verticalContent,
    verticalList,
  };
};
