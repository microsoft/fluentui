import { useControllableState } from '@fluentui/react-utilities';
import * as React from 'react';
import { ImmutableSet } from '../utils/ImmutableSet';
import type { TreeItemValue } from '../components/TreeItem/TreeItem.types';
import { TreeOpenChangeData, TreeProps } from '../Tree';

/**
 * @internal
 */
export function useControllableOpenItems(
  props: Pick<TreeProps, 'openItems' | 'defaultOpenItems'>,
): [ImmutableSet<TreeItemValue>, React.Dispatch<React.SetStateAction<ImmutableSet<TreeItemValue>>>] {
  return useControllableState({
    state: React.useMemo(() => props.openItems && ImmutableSet.from(props.openItems), [props.openItems]),
    defaultState: props.defaultOpenItems && (() => ImmutableSet.from(props.defaultOpenItems)),
    initialState: ImmutableSet.empty,
  });
}

/**
 * @internal
 */
export function createNextOpenItems(
  data: Pick<TreeOpenChangeData, 'value' | 'open'>,
  previousOpenItems: ImmutableSet<TreeItemValue>,
): ImmutableSet<TreeItemValue> {
  return data.open ? previousOpenItems.add(data.value) : previousOpenItems.delete(data.value);
}
