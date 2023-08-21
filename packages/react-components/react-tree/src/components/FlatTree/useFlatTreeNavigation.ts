import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { useEventCallback } from '@fluentui/react-utilities';
import { TreeNavigationData_unstable } from '../../Tree';
import { HeadlessTree, HeadlessTreeItemProps } from '../../utils/createHeadlessTree';
import { nextTypeAheadElement } from '../../utils/nextTypeAheadElement';
import { treeDataTypes } from '../../utils/tokens';
import { treeItemFilter } from '../../utils/treeItemFilter';
import { useRovingTabIndex } from '../../hooks/useRovingTabIndexes';
import { dataTreeItemValueAttrName, getTreeItemValueFromElement } from '../../utils/getTreeItemValueFromElement';
import { HTMLElementWalker } from '../../utils/createHTMLElementWalker';

export function useFlatTreeNavigation<Props extends HeadlessTreeItemProps>(virtualTree: HeadlessTree<Props>) {
  const { targetDocument } = useFluent_unstable();
  const { rove, initialize } = useRovingTabIndex(treeItemFilter);

  function getNextElement(data: TreeNavigationData_unstable, walker: HTMLElementWalker) {
    if (!targetDocument) {
      return null;
    }
    switch (data.type) {
      case treeDataTypes.Click:
        return data.target;
      case treeDataTypes.TypeAhead:
        walker.currentElement = data.target;
        return nextTypeAheadElement(walker, data.event.key);
      case treeDataTypes.ArrowLeft:
        return parentElement(virtualTree, data.target, walker);
      case treeDataTypes.ArrowRight:
        walker.currentElement = data.target;
        return firstChild(data.target, walker);
      case treeDataTypes.End:
        walker.currentElement = walker.root;
        return walker.lastChild();
      case treeDataTypes.Home:
        walker.currentElement = walker.root;
        return walker.firstChild();
      case treeDataTypes.ArrowDown:
        walker.currentElement = data.target;
        return walker.nextElement();
      case treeDataTypes.ArrowUp:
        walker.currentElement = data.target;
        return walker.previousElement();
    }
  }
  const navigate = useEventCallback((data: TreeNavigationData_unstable, walker: HTMLElementWalker) => {
    const nextElement = getNextElement(data, walker);
    if (nextElement) {
      rove(nextElement);
    }
  });
  return { navigate, initialize } as const;
}

function firstChild(target: HTMLElement, treeWalker: HTMLElementWalker): HTMLElement | null {
  const nextElement = treeWalker.nextElement();
  if (!nextElement) {
    return null;
  }
  const nextElementAriaPosInSet = nextElement.getAttribute('aria-posinset');
  const nextElementAriaLevel = nextElement.getAttribute('aria-level');
  const targetAriaLevel = target.getAttribute('aria-level');
  if (nextElementAriaPosInSet === '1' && Number(nextElementAriaLevel) === Number(targetAriaLevel) + 1) {
    return nextElement;
  }
  return null;
}

function parentElement(
  virtualTreeItems: HeadlessTree<HeadlessTreeItemProps>,
  target: HTMLElement,
  treeWalker: HTMLElementWalker,
) {
  const value = getTreeItemValueFromElement(target);
  if (value === null) {
    return null;
  }
  const virtualTreeItem = virtualTreeItems.get(value);
  if (virtualTreeItem?.parentValue) {
    return treeWalker.root.querySelector<HTMLElement>(
      `[${dataTreeItemValueAttrName}="${virtualTreeItem.parentValue}"]`,
    );
  }
  return null;
}
