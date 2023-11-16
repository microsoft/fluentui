import * as React from 'react';
import {
  getNativeElementProps,
  useControllableState,
  useEventCallback,
  useMergedRefs,
  slot,
} from '@fluentui/react-utilities';
import type { NavProps, NavState } from './Nav.types';
// todo
// import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import { NavGroupRegisterData, NavGroupValue, SelectNavGroupData, SelectNavGroupEvent } from '../NavContext.types';

/**
 * Create the state required to render Nav.
 *
 * The returned state can be modified with hooks such as useNavStyles_unstable,
 * before being passed to renderNav_unstable.
 *
 * @param props - props from this instance of Nav
 * @param ref - reference to root HTMLElement of Nav
 */
export const useNav = (props: NavProps, ref: React.Ref<HTMLElement>): NavState => {
  const { onNavGroupSelect } = props;

  const innerRef = React.useRef<HTMLElement>(null);

  const [selectedValue, setSelectedValue] = useControllableState({
    state: props.selectedValue,
    defaultState: props.defaultSelectedValue,
    initialState: undefined,
  });

  // considered usePrevious, but it is sensitive to re-renders
  // this could cause the previous to move to current in the case where the tab list re-renders.
  // these refs avoid getRegisteredTabs changing when selectedValue changes and causing
  // renders for tabs that have not changed.
  const currentSelectedValue = React.useRef<NavGroupValue | undefined>(undefined);
  const previousSelectedValue = React.useRef<NavGroupValue | undefined>(undefined);

  React.useEffect(() => {
    previousSelectedValue.current = currentSelectedValue.current;
    currentSelectedValue.current = selectedValue;
  }, [selectedValue]);

  const onSelect = useEventCallback((event: SelectNavGroupEvent, data: SelectNavGroupData) => {
    setSelectedValue(data.value);
    onNavGroupSelect?.(event, data);
  });

  const registeredNavGroups = React.useRef<Record<string, NavGroupRegisterData>>({});

  const onRegister = useEventCallback((data: NavGroupRegisterData) => {
    registeredNavGroups.current[JSON.stringify(data.value)] = data;
  });

  const onUnregister = useEventCallback((data: NavGroupRegisterData) => {
    delete registeredNavGroups.current[JSON.stringify(data.value)];
  });

  const getRegisteredNavGroups = React.useCallback(() => {
    return {
      selectedValue: currentSelectedValue.current,
      previousSelectedValue: previousSelectedValue.current,
      registeredNavGroups: registeredNavGroups.current,
    };
  }, []);

  return {
    components: {
      root: 'div',
    },
    root: slot.always(
      getNativeElementProps('div', {
        ref: useMergedRefs(ref, innerRef),
        ...props,
      }),
      { elementType: 'div' },
    ),
    selectedValue,
    onRegister,
    onUnregister,
    onSelect,
    getRegisteredNavGroups,
  };
};
