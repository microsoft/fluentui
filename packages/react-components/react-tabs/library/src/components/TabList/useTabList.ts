import * as React from 'react';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import {
  getIntrinsicElementProps,
  useControllableState,
  useEventCallback,
  useMergedRefs,
  slot,
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
  const {
    appearance = 'transparent',
    reserveSelectedTabSpace = true,
    disabled = false,
    onTabSelect,
    selectTabOnFocus = false,
    size = 'medium',
    vertical = false,
  } = props;

  const innerRef = React.useRef<HTMLElement>(null);

  const focusAttributes = useArrowNavigationGroup({
    circular: true,
    axis: vertical ? 'vertical' : 'horizontal',
    memorizeCurrent: false,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    unstable_hasDefault: true,
  });

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
      getIntrinsicElementProps('div', {
        // FIXME:
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: useMergedRefs(ref, innerRef) as React.Ref<HTMLDivElement>,
        role: 'tablist',
        'aria-orientation': vertical ? 'vertical' : 'horizontal',
        ...focusAttributes,
        ...props,
      } as const),
      { elementType: 'div' },
    ),
    appearance,
    reserveSelectedTabSpace,
    disabled,
    selectTabOnFocus,
    selectedValue,
    size,
    vertical,
    onRegister,
    onUnregister,
    onSelect,
    getRegisteredTabs,
  };
};
