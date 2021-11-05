import * as React from 'react';
import { getNativeElementProps, useControllableState, useEventCallback } from '@fluentui/react-utilities';
import type { SelectTabData, SelectTabEvent, TabListProps, TabListSlots, TabListState } from './TabList.types';

/**
 * Array of all shorthand properties listed in TabListSlots
 */
export const tabListShorthandProps: (keyof TabListSlots)[] = [
  'root',
  // TODO add shorthand property names
];

/**
 * Create the state required to render TabList.
 *
 * The returned state can be modified with hooks such as useTabListStyles,
 * before being passed to renderTabList.
 *
 * @param props - props from this instance of TabList
 * @param ref - reference to root HTMLElement of TabList
 */
export const useTabList = (props: TabListProps, ref: React.Ref<HTMLElement>): TabListState => {
  const { onTabSelected } = props;

  const [selectedValue, setSelectedValue] = useControllableState({
    state: props.selectedKey,
    defaultState: props.defaultSelectedKey,
    initialState: undefined,
  });

  const selectTab = useEventCallback((event: SelectTabEvent, data: SelectTabData) => {
    onTabSelected?.(event, data);
    setSelectedValue(data.value);
  });

  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add slot types here if needed (div is the default)
      root: 'div',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: getNativeElementProps('div', {
      ref,
      ...props,
    }),
    selectedKey: selectedValue,
    selectTab,
  };
};
