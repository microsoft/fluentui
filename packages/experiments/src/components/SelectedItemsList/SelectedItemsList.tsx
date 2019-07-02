import * as React from 'react';

import { ISelectedItemsListProps, BaseSelectedItem } from './SelectedItemsList.types';
import { ControlledSelectedItemsList } from './ControlledSelectedItemsList';
import { UncontrolledSelectedItemsList } from './UncontrolledSelectedItemsList';

/**
 * Will render either a controlled or uncontrolled selected items depending on the props that are passed in.
 */
export const SelectedItemsList = React.memo(<TItem extends BaseSelectedItem>(props: ISelectedItemsListProps<TItem>) => {
  if (props.isControlled) {
    return <ControlledSelectedItemsList<TItem> {...props} />;
  } else {
    return <UncontrolledSelectedItemsList<TItem> {...props} />;
  }
  // Cast back to a generic function type, since typescript <3.4 collapses generics on higher-order functions
  // This was solved by https://github.com/microsoft/TypeScript/pull/30215 in typescript@3.4,
}) as <TItem extends BaseSelectedItem>(props: ISelectedItemsListProps<TItem>) => React.ReactElement;
export type SelectedItemsList<TItem extends BaseSelectedItem> = (props: ISelectedItemsListProps<TItem>) => React.ReactElement;
