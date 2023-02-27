import { isHTMLElementWithRole } from './isHTMLElementWithRole';

export function filterTreeItemAndGroup(node: Node) {
  const element = node as HTMLElement;
  const role = element.getAttribute('role');
  return role === 'treeitem' || role === 'group' ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
}
export function filterTreeItem(node: Node) {
  return isHTMLElementWithRole(node, 'treeitem') ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
}
