export const dataTreeItemValueAttrName = 'data-fui-tree-item-value';

export const getTreeItemValueFromElement = (element: HTMLElement) => {
  return element.getAttribute(dataTreeItemValueAttrName);
};
