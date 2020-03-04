import * as _ from 'lodash';
import * as React from 'react';
import { TreeItemProps } from '../TreeItem';
import { ShorthandValue } from '../../../types';

export const hasSubtree = (item: TreeItemProps | ShorthandValue<TreeItemProps>): boolean => {
  return !_.isNil(item['items']) && item['items'].length > 0;
};

export const removeItemAtIndex = (items: any[], itemIndex: number): any[] => {
  return [...items.slice(0, itemIndex), ...items.slice(itemIndex + 1)];
};

export interface TreeItemRenderContextValue {
  onFocusParent: (itemId: string) => void;
}

export const TreeItemContext = React.createContext<TreeItemRenderContextValue>(null);
