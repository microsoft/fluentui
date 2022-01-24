import * as React from 'react';
import { getNativeElementProps, resolveShorthand, useEventCallback } from '@fluentui/react-utilities';
import type { TabProps, TabState } from './Tab.types';
import { TabListContext } from '../TabList/TabListContext';
import { useContextSelector } from '@fluentui/react-context-selector';
import { SelectTabEvent } from '../TabList/TabList.types';

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

  const { appearance, selected, onSelect, size, vertical } = useContextSelector(TabListContext, ctx => ({
    appearance: ctx.appearance,
    selected: ctx.selectedValue === value,
    onSelect: ctx.onSelect,
    size: ctx.size,
    vertical: !!ctx.vertical,
  }));

  const onClick = useEventCallback((event: SelectTabEvent) => onSelect(event, { value }));

  return {
    components: {
      root: 'div',
      icon: 'span',
      content: 'span',
    },
    root: getNativeElementProps('div', {
      ref,
      role: 'tab',
      tabIndex: 0,
      ...props,
      onClick,
    }),
    icon: resolveShorthand(icon),
    content: resolveShorthand(content, { required: true, defaultProps: { children: props.children } }),
    appearance,
    selected,
    size,
    value,
    vertical,
  };
};
