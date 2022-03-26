import * as React from 'react';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import {
  getNativeElementProps,
  useControllableState,
  useEventCallback,
  useMergedRefs,
} from '@fluentui/react-utilities';
import type { RegisterTabData, SelectTabData, SelectTabEvent, TabListProps, TabListState } from './TabList.types';
import { TabValue } from '../Tab/Tab.types';

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
  const { appearance = 'transparent', disabled = false, onTabSelect, size = 'medium', vertical = false } = props;

  const innerRef = React.useRef<HTMLElement>(null);

  const focusAttributes = useArrowNavigationGroup({ circular: true, axis: vertical ? 'vertical' : 'horizontal' });

  const [selectedValue, setSelectedValue] = useControllableState({
    state: props.selectedValue,
    defaultState: props.defaultSelectedValue,
    initialState: undefined,
  });

  // considered usePrevious, but it is sensitive to re-renders
  // this could cause the previous to move to current in the case where the tab list re-renders.
  const [previousSelectedValue, setPreviousSelectedValue] = useControllableState<TabValue | undefined>({
    state: undefined,
    defaultState: undefined,
    initialState: undefined,
  });

  const onSelect = useEventCallback((event: SelectTabEvent, data: SelectTabData) => {
    setPreviousSelectedValue(selectedValue);
    setSelectedValue(data.value);
    onTabSelect?.(event, data);
  });

  // when tabs register their refs, observe them for resize
  const registeredTabs = React.useRef<Record<string, RegisterTabData>>({});

  const onRegister = useEventCallback((data: RegisterTabData) => {
    registeredTabs.current[JSON.stringify(data.value)] = data;
    data.ref?.current;
  });

  const onUnregister = useEventCallback((data: RegisterTabData) => {
    delete registeredTabs.current[JSON.stringify(data.value)];
    data.ref?.current;
  });

  return {
    components: {
      root: 'div',
    },
    root: getNativeElementProps('div', {
      ref: useMergedRefs(ref, innerRef),
      role: 'tablist',
      ...focusAttributes,
      ...props,
    }),
    appearance,
    disabled,
    selectedValue,
    size,
    vertical,
    onRegister,
    onUnregister,
    onSelect,
    previousSelectedValue,
    registeredTabs: registeredTabs.current,
  };
};
