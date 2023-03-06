import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, End, Home } from '@fluentui/keyboard-keys';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { TreeNavigationData_unstable } from '../Tree';
import { useTreeItemWalker } from './useTreeItemWalker';
import type { TreeItemPropsReferences } from './useFlatTreeItems';
import { nextTypeAheadElement } from '../utils/nextTypeAheadElement';
import { HTMLElementWalker } from '../utils/createHTMLElementWalker';

export function useFlatTreeNavigation(references: TreeItemPropsReferences) {
  const { targetDocument } = useFluent_unstable();
  const [treeWalkerRef, rootRef] = useTreeItemWalker();

  function navigate({ target, type, event: { key } }: TreeNavigationData_unstable) {
    const treeWalker = treeWalkerRef.current;
    if (!targetDocument || !treeWalker) {
      return;
    }
    switch (type) {
      case 'TypeAhead':
        treeWalker.currentElement = target;
        return nextTypeAheadElement(treeWalker, key)?.focus();
      case ArrowLeft:
        return parentElement(references, target)?.focus();
      case ArrowRight:
        treeWalker.currentElement = target;
        return firstChild(target, treeWalker)?.focus();
      case End:
        treeWalker.currentElement = treeWalker.root;
        return treeWalker.lastChild()?.focus();
      case Home:
        treeWalker.currentElement = treeWalker.root;
        return treeWalker.firstChild()?.focus();
      case ArrowDown:
        treeWalker.currentElement = target;
        return treeWalker.nextElement()?.focus();
      case ArrowUp:
        treeWalker.currentElement = target;
        return treeWalker.previousElement()?.focus();
    }
  }
  return [navigate, rootRef] as const;
}

function firstChild(target: HTMLElement, treeWalker: HTMLElementWalker) {
  const nextElement = treeWalker.nextElement();
  if (!nextElement) {
    return;
  }
  const nextElementAriaPosInSet = nextElement.getAttribute('aria-posinset');
  const nextElementAriaLevel = nextElement.getAttribute('aria-level');
  const targetAriaLevel = target.getAttribute('aria-level');
  if (nextElementAriaPosInSet === '1' && Number(nextElementAriaLevel) === Number(targetAriaLevel) + 1) {
    return nextElement;
  }
  return null;
}

function parentElement(references: TreeItemPropsReferences, target: HTMLElement) {
  const treeItemPropsRef = references.get(target.id);
  if (treeItemPropsRef && treeItemPropsRef.parentId) {
    return document.getElementById(treeItemPropsRef.parentId);
  }
  return null;
}
