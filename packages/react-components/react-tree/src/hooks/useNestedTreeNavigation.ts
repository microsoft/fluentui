import { TreeNavigationData_unstable } from '../Tree';
import { HTMLElementWalker, useHTMLElementWalkerRef } from './useHTMLElementWalker';
import { nextTypeAheadElement } from '../utils/nextTypeAheadElement';
import { treeDataTypes } from '../utils/tokens';
import { treeItemFilter } from '../utils/treeItemFilter';
import { useRovingTabIndex } from './useRovingTabIndexes';
import { useMergedRefs } from '@fluentui/react-utilities';

export function useNestedTreeNavigation() {
  const [{ rove }, rovingRootRef] = useRovingTabIndex(treeItemFilter);
  const [walkerRef, rootRef] = useHTMLElementWalkerRef(treeItemFilter);

  const getNextElement = (data: TreeNavigationData_unstable) => {
    if (!walkerRef.current) {
      return;
    }
    const treeItemWalker = walkerRef.current;
    switch (data.type) {
      case treeDataTypes.click:
        return data.target;
      case treeDataTypes.typeAhead:
        treeItemWalker.currentElement = data.target;
        return nextTypeAheadElement(treeItemWalker, data.event.key);
      case treeDataTypes.arrowLeft:
        treeItemWalker.currentElement = data.target;
        return treeItemWalker.parentElement();
      case treeDataTypes.arrowRight:
        treeItemWalker.currentElement = data.target;
        return treeItemWalker.firstChild();
      case treeDataTypes.end:
        treeItemWalker.currentElement = treeItemWalker.root;
        return lastChildRecursive(treeItemWalker);
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
