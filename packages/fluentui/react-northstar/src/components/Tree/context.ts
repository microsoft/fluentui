import * as React from 'react';
import * as _ from 'lodash';
import { BaseFlatTreeItem } from './hooks/flattenTree';

export interface TreeRenderContextValue {
  toggleActive: (ids: string[], e: React.SyntheticEvent) => void;
  toggleSelect: (ids: string[], e: React.SyntheticEvent) => void;
  focusFirstChild: (id: string) => void;
  focusParent: (id: string) => void;
  siblingsExpand: (e: React.SyntheticEvent, id: string) => void;
  registerItemRef: (id: string, node: HTMLElement) => void;
  getItemById: (id: string) => BaseFlatTreeItem & { [key: string]: any };
}

export const TreeContext = React.createContext<TreeRenderContextValue>({
  toggleActive: _.noop,
  toggleSelect: _.noop,
  focusFirstChild: _.noop,
  focusParent: _.noop,
  siblingsExpand: _.noop,
  registerItemRef: _.noop,
  getItemById: id => ({ id } as any),
});
