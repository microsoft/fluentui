import * as React from 'react';
import * as _ from 'lodash';
import { FlatTreeItem } from './hooks/flattenTree';

export interface TreeRenderContextValue {
  getItemById: (id: string) => FlatTreeItem & { [key: string]: any };
  registerItemRef: (id: string, node: HTMLElement) => void;
  toggleItemActive: (e: React.SyntheticEvent, idToToggle: string) => void;
  focusItemById: (id: string) => void;
  expandSiblings: (e: React.SyntheticEvent, id: string) => void;
  toggleItemSelect: (e: React.SyntheticEvent, idToToggle: string) => void;
  getToFocusIDByFirstCharacter: (e: React.KeyboardEvent, idToStartSearch: string) => string;
}

export const TreeContext = React.createContext<TreeRenderContextValue>({
  getItemById: id => ({ id } as any),
  registerItemRef: _.noop,
  toggleItemActive: _.noop,
  focusItemById: _.noop,
  expandSiblings: _.noop,
  toggleItemSelect: _.noop,
  getToFocusIDByFirstCharacter: (e, id) => id,
});
