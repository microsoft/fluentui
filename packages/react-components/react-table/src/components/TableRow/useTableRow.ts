import * as React from 'react';
import { getNativeElementProps, mergeCallbacks, useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import type { TableRowProps, TableRowState } from './TableRow.types';
import { useTableContext } from '../../contexts/tableContext';
import { useFocusVisible } from '@fluentui/react-tabster';

/**
 * Create the state required to render TableRow.
 *
 * The returned state can be modified with hooks such as useTableRowStyles_unstable,
 * before being passed to renderTableRow_unstable.
 *
 * @param props - props from this instance of TableRow
 * @param ref - reference to root HTMLElement of TableRow
 */
export const useTableRow_unstable = (props: TableRowProps, ref: React.Ref<HTMLElement>): TableRowState => {
  const { noNativeElements, size } = useTableContext();
  const rootComponent = props.as ?? noNativeElements ? 'div' : 'tr';
  const focusVisibleRef = useFocusVisible();
  const [renderSubtle, setRenderSubtle] = React.useState(false);

  const onMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setRenderSubtle(true);
  };

  const onMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setRenderSubtle(false);
  };

  const onFocus = (e: React.FocusEvent) => {
    if (e.currentTarget.contains(e.target)) {
      setRenderSubtle(true);
    }
  };

  const onBlur = (e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setRenderSubtle(false);
    }
  };

  return {
    components: {
      root: rootComponent,
    },
    root: getNativeElementProps(rootComponent, {
      ref: useMergedRefs(ref, focusVisibleRef),
      role: rootComponent === 'div' ? 'row' : undefined,
      onMouseEnter: useEventCallback(mergeCallbacks(onMouseEnter, props.onMouseEnter)),
      onMouseLeave: useEventCallback(mergeCallbacks(onMouseLeave, props.onMouseLeave)),
      onBlur: useEventCallback(mergeCallbacks(onBlur, props.onBlur)),
      onFocus: useEventCallback(mergeCallbacks(onFocus, props.onFocus)),
      ...props,
    }),
    size,
    noNativeElements,
    renderSubtle,
    appearance: props.appearance ?? 'none',
  };
};
