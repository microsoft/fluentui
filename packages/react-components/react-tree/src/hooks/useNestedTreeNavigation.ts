import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, End, Home } from '@fluentui/keyboard-keys';
import { TreeNavigationData_unstable } from '../Tree';
import { HTMLElementWalker } from '../utils/createHTMLElementWalker';
import { nextTypeAheadElement } from '../utils/nextTypeAheadElement';
import { useTreeItemWalker } from './useTreeItemWalker';

export function useNestedTreeNavigation() {
  const [treeWalkerRef, rootRef] = useTreeItemWalker();

  function navigate({ type, target, event: { key } }: TreeNavigationData_unstable) {
    const treeItemWalker = treeWalkerRef.current;
    if (!treeItemWalker) {
      return;
    }
    switch (type) {
      case 'TypeAhead':
        treeItemWalker.currentElement = target;
        return nextTypeAheadElement(treeItemWalker, key)?.focus();
      case ArrowLeft:
        treeItemWalker.currentElement = target;
        return treeItemWalker.parentElement()?.focus();
      case ArrowRight:
        treeItemWalker.currentElement = target;
        return treeItemWalker.firstChild()?.focus();
      case End:
        treeItemWalker.currentElement = treeItemWalker.root;
        return lastChildRecursive(treeItemWalker)?.focus();
      case Home:
        treeItemWalker.currentElement = treeItemWalker.root;
        return treeItemWalker.firstChild()?.focus();
      case ArrowDown:
        treeItemWalker.currentElement = target;
        return treeItemWalker.nextElement()?.focus();
      case ArrowUp:
        treeItemWalker.currentElement = target;
        return treeItemWalker.previousElement()?.focus();
    }
  }
  return [navigate, rootRef] as const;
}

function lastChildRecursive(walker: HTMLElementWalker) {
  let lastElement: HTMLElement | null = null;
  let nextElement: HTMLElement | null = null;
  while ((nextElement = walker.lastChild())) {
    lastElement = nextElement;
  }
  return lastElement;
}
