import * as React from 'react';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import {
  getNativeElementProps,
  useConst,
  useControllableState,
  useEventCallback,
  useMergedRefs,
} from '@fluentui/react-utilities';
import type { RegisterTabData, SelectTabData, SelectTabEvent, TabListProps, TabListState } from './TabList.types';

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

  const innerRef = React.useRef<HTMLElement>(null);

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

  // provide force recalculation of the selection indicator rectangle
  const [calcRect, setCalcRect] = React.useState(0);
  const recalcRect = useConst(() => () => setCalcRect(value => ++value));

  // when this list or any tab resizes, recalculate the selection indicator rectangle
  const resizeObserver = React.useMemo(
    () =>
      new ResizeObserver(entries => {
        recalcRect();
      }),
    [recalcRect],
  );

  // observe this list for resize
  React.useEffect(() => {
    const currentRef = innerRef.current;
    currentRef && resizeObserver.observe(currentRef);

    return () => {
      currentRef && resizeObserver.unobserve(currentRef);
    };
  }, [resizeObserver]);

  // when tabs register their refs, observe them for resize
  const registeredTabs = React.useRef<Record<string, RegisterTabData>>({});

  const onRegister = useEventCallback((data: RegisterTabData) => {
    registeredTabs.current[JSON.stringify(data.value)] = data;
    data.ref?.current && resizeObserver.observe(data.ref.current);
    recalcRect();
  });

  const onUnregister = useEventCallback((data: RegisterTabData) => {
    delete registeredTabs.current[JSON.stringify(data.value)];
    data.ref?.current && resizeObserver.unobserve(data.ref.current);
    recalcRect();
  });

  // calculate the selection indicator rectangle
  const selectedTabRect = React.useMemo(() => {
    const listRect = innerRef.current?.getBoundingClientRect();
    const tabRef: React.Ref<HTMLElement> = registeredTabs.current[JSON.stringify(selectedValue)]?.ref;
    const tabRect = tabRef?.current?.getBoundingClientRect();

    if (listRect && tabRect) {
      return {
        x: tabRect.x - listRect.x,
        y: tabRect.y - listRect.y,
        width: tabRect.width,
        height: tabRect.height,
      };
    }
    // calcRect is used to force updates when registered tabs change or resize occurs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calcRect, selectedValue]);

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
    selectedTabRect,
    selectedValue,
    size,
    vertical,
    onRegister,
    onUnregister,
    onSelect,
  };
};
