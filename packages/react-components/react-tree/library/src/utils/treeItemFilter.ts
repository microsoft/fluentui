export const treeItemFilter = (element: HTMLElement): number => {
  return element.getAttribute('role') === 'treeitem' ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
};
