import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import { TreeNavigationData_unstable } from '../Tree';
import { FlatTreeItems } from '../utils/createFlatTreeItems';
import { nextTypeAheadElement } from '../utils/nextTypeAheadElement';
import { treeDataTypes } from '../utils/tokens';
import { treeItemFilter } from '../utils/treeItemFilter';
import { HTMLElementWalker, useHTMLElementWalkerRef } from './useHTMLElementWalker';
import { useRovingTabIndex } from './useRovingTabIndexes';
import { FlatTreeItemProps } from './useFlatTree';
import { dataTreeItemValueAttrName, getTreeItemValueFromElement } from '../utils/getTreeItemValueFromElement';

export function useFlatTreeNavigation<Props extends FlatTreeItemProps = FlatTreeItemProps>(
  flatTreeItems: FlatTreeItems<Props>,
) {
  const { targetDocument } = useFluent_unstable();
  const [treeItemWalkerRef, treeItemWalkerRootRef] = useHTMLElementWalkerRef(treeItemFilter);
  const [{ rove }, rovingRootRef] = useRovingTabIndex(treeItemFilter);

  function getNextElement(data: TreeNavigationData_unstable) {
    if (!targetDocument || !treeItemWalkerRef.current) {
      return null;
    }
    const treeItemWalker = treeItemWalkerRef.current;
    switch (data.type) {
      case treeDataTypes.Click:
        return data.target;
      case treeDataTypes.TypeAhead:
        treeItemWalker.currentElement = data.target;
        return nextTypeAheadElement(treeItemWalker, data.event.key);
      case treeDataTypes.ArrowLeft:
        return parentElement(flatTreeItems, data.target, treeItemWalker);
      case treeDataTypes.ArrowRight:
        treeItemWalker.currentElement = data.target;
        return firstChild(data.target, treeItemWalker);
      case treeDataTypes.End:
        treeItemWalker.currentElement = treeItemWalker.root;
        return treeItemWalker.lastChild();
      case treeDataTypes.Home:
        treeItemWalker.currentElement = treeItemWalker.root;
        return treeItemWalker.firstChild();
      case treeDataTypes.ArrowDown:
        treeItemWalker.currentElement = data.target;
        return treeItemWalker.nextElement();
      case treeDataTypes.ArrowUp:
        treeItemWalker.currentElement = data.target;
        return treeItemWalker.previousElement();
    }
  }
  const navigate = useEventCallback((data: TreeNavigationData_unstable) => {
    const nextElement = getNextElement(data);
    if (nextElement) {
      rove(nextElement);
    }
  });
  return [navigate, useMergedRefs(treeItemWalkerRootRef, rovingRootRef)] as const;
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
  flatTreeItems: FlatTreeItems<FlatTreeItemProps>,
  target: HTMLElement,
  treeWalker: HTMLElementWalker,
) {
  const value = getTreeItemValueFromElement(target);
  if (value === null) {
    return null;
  }
  const flatTreeItem = flatTreeItems.get(value);
  if (flatTreeItem?.parentValue) {
    return treeWalker.root.querySelector<HTMLElement>(`[${dataTreeItemValueAttrName}="${flatTreeItem.parentValue}"]`);
  }
  return null;
}
