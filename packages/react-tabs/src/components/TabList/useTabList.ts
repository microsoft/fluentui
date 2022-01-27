import * as React from 'react';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import { getNativeElementProps, useControllableState, useEventCallback } from '@fluentui/react-utilities';
import type { SelectTabData, SelectTabEvent, TabListProps, TabListState } from './TabList.types';

/**
 * Create the state required to render TabList.
 *
 * The returned state can be modified with hooks such as useTabListStyles_unstable,
 * before being passed to renderTabList_unstable.
 *
 * @param props - props from this instance of TabList
 * @param ref - reference to root HTMLElement of TabList
 */
export const useTabList_unstable = (props: TabListProps, ref: React.Ref<HTMLElement>): TabListState => {
  const { appearance = 'transparent', onTabSelect, size = 'medium', vertical = false } = props;

  const focusAttributes = useArrowNavigationGroup({ circular: true, axis: vertical ? 'vertical' : 'horizontal' });

  const [selectedValue, setSelectedValue] = useControllableState({
    state: props.selectedValue,
    defaultState: props.defaultSelectedValue,
    initialState: undefined,
  });

  const onSelect = useEventCallback((event: SelectTabEvent, data: SelectTabData) => {
    onTabSelect?.(event, data);
    setSelectedValue(data.value);
  });

  return {
    components: {
      root: 'div',
    },
    root: getNativeElementProps('div', {
      ref,
      role: 'tablist',
      ...focusAttributes,
      ...props,
    }),
    appearance,
    selectedValue: selectedValue,
    onSelect,
    size,
    vertical,
  };
};
