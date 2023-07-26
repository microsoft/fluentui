import { useMergedRefs } from '@fluentui/react-utilities';
import { TreeNavigationData_unstable } from './Tree.types';
import { nextTypeAheadElement } from '../../utils/nextTypeAheadElement';
import { treeDataTypes } from '../../utils/tokens';
import { treeItemFilter } from '../../utils/treeItemFilter';
import { useRovingTabIndex } from '../../hooks/useRovingTabIndexes';
import { HTMLElementWalker, useHTMLElementWalkerRef } from '../../hooks/useHTMLElementWalker';

export function useTreeNavigation() {
  const [{ rove }, rovingRootRef] = useRovingTabIndex(treeItemFilter);
  const [walkerRef, rootRef] = useHTMLElementWalkerRef(treeItemFilter);

  const getNextElement = (data: TreeNavigationData_unstable) => {
    if (!walkerRef.current) {
      return;
    }
    const treeItemWalker = walkerRef.current;
    switch (data.type) {
      case treeDataTypes.Click:
        return data.target;
      case treeDataTypes.TypeAhead:
        treeItemWalker.currentElement = data.target;
        return nextTypeAheadElement(treeItemWalker, data.event.key);
      case treeDataTypes.ArrowLeft:
        treeItemWalker.currentElement = data.target;
        return treeItemWalker.parentElement();
      case treeDataTypes.ArrowRight:
        treeItemWalker.currentElement = data.target;
        return treeItemWalker.firstChild();
      case treeDataTypes.End:
        treeItemWalker.currentElement = treeItemWalker.root;
        return lastChildRecursive(treeItemWalker);
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
  };
  function navigate(data: TreeNavigationData_unstable) {
    const nextElement = getNextElement(data);
    if (nextElement) {
      rove(nextElement);
    }
  }
  return [navigate, useMergedRefs(rootRef, rovingRootRef)] as const;
}

function lastChildRecursive(walker: HTMLElementWalker) {
  let lastElement: HTMLElement | null = null;
  let nextElement: HTMLElement | null = null;
  while ((nextElement = walker.lastChild())) {
    lastElement = nextElement;
  }
  return lastElement;
}
