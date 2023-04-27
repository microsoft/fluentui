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

export function useFlatTreeNavigation<Props extends FlatTreeItemProps<unknown> = FlatTreeItemProps>(
  flatTreeItems: FlatTreeItems<Props>,
) {
  const { targetDocument } = useFluent_unstable();
  const [treeItemWalkerRef, treeItemWalkerRootRef] = useHTMLElementWalkerRef(treeItemFilter);
  const [{ rove }, rovingRootRef] = useRovingTabIndex(treeItemFilter);

  function getNextElement(data: TreeNavigationData_unstable<Props['value']>) {
    if (!targetDocument || !treeItemWalkerRef.current) {
      return null;
    }
    const treeItemWalker = treeItemWalkerRef.current;
    switch (data.type) {
      case treeDataTypes.click:
        return data.target;
      case treeDataTypes.typeAhead:
        treeItemWalker.currentElement = data.target;
        return nextTypeAheadElement(treeItemWalker, data.event.key);
      case treeDataTypes.arrowLeft:
        return parentElement(flatTreeItems, data.value);
      case treeDataTypes.arrowRight:
        treeItemWalker.currentElement = data.target;
        return firstChild(data.target, treeItemWalker);
      case treeDataTypes.end:
        treeItemWalker.currentElement = treeItemWalker.root;
        return treeItemWalker.lastChild();
      case treeDataTypes.home:
        treeItemWalker.currentElement = treeItemWalker.root;
        return treeItemWalker.firstChild();
      case treeDataTypes.arrowDown:
        treeItemWalker.currentElement = data.target;
        return treeItemWalker.nextElement();
      case treeDataTypes.arrowUp:
        treeItemWalker.currentElement = data.target;
        return treeItemWalker.previousElement();
    }
  }
  const navigate = useEventCallback((data: TreeNavigationData_unstable<Props['value']>) => {
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

function parentElement(flatTreeItems: FlatTreeItems<FlatTreeItemProps<unknown>>, value: unknown) {
  const flatTreeItem = flatTreeItems.get(value);
  if (flatTreeItem?.parentValue) {
    const parentItem = flatTreeItems.get(flatTreeItem.parentValue);
    return parentItem?.ref.current ?? null;
  }
  return null;
}
