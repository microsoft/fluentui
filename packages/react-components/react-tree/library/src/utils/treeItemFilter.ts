export const treeItemFilter = (element: HTMLElement) => {
  return element.getAttribute('role') === 'treeitem' ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
};
