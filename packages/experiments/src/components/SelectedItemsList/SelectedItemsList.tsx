import * as React from 'react';

import {
  IControlledSelectedItemListProps,
  IUncontrolledSelectedItemListProps,
  ISelectedItemsListProps,
  BaseSelectedItem
} from './SelectedItemsList.types';
import { ControlledSelectedItemsList } from './ControlledSelectedItemsList';
import { UncontrolledSelectedItemsList } from './UncontrolledSelectedItemsList';

const isControlledSelectedItemList = <T extends BaseSelectedItem>(
  props: IControlledSelectedItemListProps<T> | IUncontrolledSelectedItemListProps<T>
): props is IControlledSelectedItemListProps<T> => (props as any).selectedItems !== undefined;

/**
 * Will render either a controlled or uncontrolled selected items depending on the props that are passed in.
 *
 * In the implementation, it uses the presence of selectedItems to determine if the component should be
 * controlled or uncontrolled. However, the consumer should only be able to specify selectedItems when
 * passing the set of props legal for the ControlledSelectedItemsList.
 */
export const SelectedItemsList = React.memo(<TItem extends BaseSelectedItem>(props: ISelectedItemsListProps<TItem>) => {
  if (isControlledSelectedItemList<TItem>(props)) {
    return <ControlledSelectedItemsList<TItem> {...props} />;
  } else {
    return <UncontrolledSelectedItemsList<TItem> {...props} />;
  }
  // Cast back to a generic function type, since typescript <3.4 collapses generics on higher-order functions
  // This was solved by https://github.com/microsoft/TypeScript/pull/30215 in typescript@3.4,
}) as <TItem extends BaseSelectedItem>(props: ISelectedItemsListProps<TItem>) => React.ReactElement;
export type SelectedItemsList<TItem extends BaseSelectedItem> = ControlledSelectedItemsList<TItem> | UncontrolledSelectedItemsList<TItem>;
