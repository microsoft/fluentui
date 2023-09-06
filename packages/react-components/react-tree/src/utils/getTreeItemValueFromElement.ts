import type { TreeItemValue } from '../TreeItem';
import { dataTreeItemValueAttrName } from './tokens';

export const getTreeItemValueFromElement = (element: HTMLElement) => {
  return element.getAttribute(dataTreeItemValueAttrName) as TreeItemValue | null;
};
