'use client';

import * as React from 'react';
import { type TabsterDOMAttribute, useArrowNavigationGroup } from '@fluentui/react-tabster';
import { useControllableState, useEventCallback, useMergedRefs, slot } from '@fluentui/react-utilities';
import type {
  TabRegisterData,
  SelectTabData,
  SelectTabEvent,
  TabListBaseProps,
  TabListBaseState,
  TabListProps,
  TabListState,
} from './TabList.types';
import type { TabValue } from '../Tab';

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
  const { appearance = 'transparent', reserveSelectedTabSpace = true, size = 'medium' } = props;
  const state = useTabListBase_unstable(props, ref);
  const focusAttributes = useTabListFocusAttributes_unstable({ vertical: state.vertical });

  return {
    ...state,
    root: {
      ...state.root,
      ...focusAttributes,
    },
    appearance,
    reserveSelectedTabSpace,
    size,
  };
};

/**
 * Create the state required to render TabList.
 *
 * The returned state can be modified with hooks such as useTabListStyles_unstable,
 * before being passed to renderTabList_unstable.
 *
 * @param props - props from this instance of TabList
 * @param ref - reference to root HTMLElement of TabList
 */
export const useTabListBase_unstable = (props: TabListBaseProps, ref: React.Ref<HTMLElement>): TabListBaseState => {
  const {
    disabled = false,
    onTabSelect,
    selectTabOnFocus = false,
    vertical = false,
    selectedValue: controlledSelectedValue,
    defaultSelectedValue,
    ...rest
  } = props;

  const innerRef = React.useRef<HTMLElement>(null);

  const [selectedValue, setSelectedValue] = useControllableState({
    state: controlledSelectedValue,
    defaultState: defaultSelectedValue,
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
    const key = JSON.stringify(data.value);

    if (!key && process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error(
        [
          `[@fluentui/react-tabs] The value "${data.value}" cannot be serialized to JSON string.`,
          'Tab component requires serializable values.',
          'Please provide a primitive value (string, number, boolean),',
          `or a plain object/array that doesn't contain functions, symbols, or circular references.`,
        ].join(' '),
      );
    }

    registeredTabs.current[key] = data;
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
    root: slot.always(
      {
        ref: useMergedRefs(ref, innerRef) as React.Ref<HTMLDivElement>,
        role: 'tablist',
        'aria-orientation': vertical ? 'vertical' : 'horizontal',
        ...rest,
      },
      { elementType: 'div' },
    ),
    disabled,
    selectTabOnFocus,
    selectedValue,
    onRegister,
    onUnregister,
    onSelect,
    getRegisteredTabs,
    vertical,
  };
};

/**
 * Hook to get Tabster DOM attributes for TabList focus handling
 *
 * @internal
 * @param vertical - whether the TabList is vertical
 * @returns Tabster DOM attributes
 */
export const useTabListFocusAttributes_unstable = ({
  vertical,
}: Pick<TabListBaseState, 'vertical'>): TabsterDOMAttribute => {
  return useArrowNavigationGroup({
    circular: true,
    axis: vertical ? 'vertical' : 'horizontal',
    memorizeCurrent: false,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    unstable_hasDefault: true,
  });
};
