import * as React from 'react';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import {
  getNativeElementProps,
  useControllableState,
  useEventCallback,
  useMergedRefs,
} from '@fluentui/react-utilities';
import type { TabRegisterData, SelectTabData, SelectTabEvent, TabListProps, TabListState } from './TabList.types';
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
  // these refs avoid getRegisteredTabs changing when selectedValue changes and causing
  // renders for tabs that have not changed.
  const currentSelectedValue = React.useRef<TabValue | undefined>(undefined);
  const previousSelectedValue = React.useRef<TabValue | undefined>(undefined);

  React.useEffect(() => {
    previousSelectedValue.current = currentSelectedValue.current;
    currentSelectedValue.current = selectedValue;
  }, [selectedValue]);

  const onSelect = useEventCallback((event: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value);
    onTabSelect?.(event, data);
  });

  const registeredTabs = React.useRef<Record<string, TabRegisterData>>({});

  const onRegister = useEventCallback((data: TabRegisterData) => {
    registeredTabs.current[JSON.stringify(data.value)] = data;
  });

  const onUnregister = useEventCallback((data: TabRegisterData) => {
    delete registeredTabs.current[JSON.stringify(data.value)];
  });

  const getRegisteredTabs = React.useCallback(() => {
    return {
      selectedValue: currentSelectedValue.current,
      previousSelectedValue: previousSelectedValue.current,
      registeredTabs: registeredTabs.current,
    };
  }, []);

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
    getRegisteredTabs,
  };
};
