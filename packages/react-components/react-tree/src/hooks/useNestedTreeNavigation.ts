import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, End, Home } from '@fluentui/keyboard-keys';
import { TreeNavigationData_unstable } from '../Tree';
import { filterTreeItemAndGroup } from '../utils/filterTreeItemAndGroup';
import { isHTMLElementWithRole } from '../utils/isHTMLElementWithRole';
import { useDOMTreeWalker } from './useDOMTreeWalker';

export function useNestedTreeNavigation() {
  const [treeWalkerRef, rootRef] = useDOMTreeWalker(NodeFilter.SHOW_ELEMENT, {
    acceptNode: filterTreeItemAndGroup,
  });

  function navigate(data: TreeNavigationData_unstable) {
    const { current: treeWalker } = treeWalkerRef;
    if (!treeWalker) {
      return;
    }
    switch (data.type) {
      case ArrowLeft:
        return focusSubtreeOwnerItem(data.target, { treeWalker });
      case ArrowRight:
        return focusFirstSubtreeItem(data.target, { treeWalker });
      case 'TypeAhead':
        return focusTypeAhead(data.target, { key: data.event.key, treeWalker });
      case End:
        return focusLastTreeItem({ treeWalker });
      case Home:
        return focusFirstTreeItem({ treeWalker });
      case ArrowDown:
        return focusNextTreeItem(data.target, { treeWalker });
      case ArrowUp:
        return focusPreviousTreeItem(data.target, { treeWalker });
    }
  }
  return [navigate, rootRef] as const;
}

type TreeWalkerOptions = { treeWalker: TreeWalker };

export function focusTypeAhead(target: HTMLElement, { treeWalker, key }: { key: string } & TreeWalkerOptions) {
  treeWalker.currentNode = target;
  const keyToLowerCase = key.toLowerCase();
  let nextNode: Node | null;
  while ((nextNode = treeWalker.nextNode()) !== target) {
    if (nextNode === null) {
      treeWalker.currentNode = treeWalker.root;
      continue;
    }
    if (
      isHTMLElementWithRole(nextNode, 'treeitem') &&
      nextNode.textContent?.trim().charAt(0).toLowerCase() === keyToLowerCase
    ) {
      nextNode.focus();
      return;
    }
  }
}

function focusFirstTreeItem({ treeWalker }: TreeWalkerOptions) {
  treeWalker.currentNode = treeWalker.root;
  const nextNode = treeWalker.firstChild();
  if (!isHTMLElementWithRole(nextNode, 'treeitem')) {
    return;
  }
  nextNode.focus();
}

function focusLastTreeItem({ treeWalker }: TreeWalkerOptions) {
  treeWalker.currentNode = treeWalker.root;
  let lastNode: Node | null = null;
  let nextNode: Node | null = null;
  while ((nextNode = treeWalker.lastChild())) {
    lastNode = nextNode;
  }
  if (!isHTMLElementWithRole(lastNode, 'treeitem')) {
    return;
  }
  lastNode.focus();
}

function focusPreviousTreeItem(target: HTMLElement, { treeWalker }: TreeWalkerOptions) {
  treeWalker.currentNode = target;
  let previousNode = treeWalker.previousNode();
  if (isHTMLElementWithRole(previousNode, 'group')) {
    previousNode = treeWalker.previousNode();
  }
  if (!isHTMLElementWithRole(previousNode, 'treeitem')) {
    return;
  }
  previousNode.focus();
}

function focusNextTreeItem(target: HTMLElement, { treeWalker }: TreeWalkerOptions) {
  treeWalker.currentNode = target;
  let nextNode = treeWalker.nextNode();
  if (isHTMLElementWithRole(nextNode, 'group')) {
    nextNode = treeWalker.nextNode();
  }
  if (!isHTMLElementWithRole(nextNode, 'treeitem')) {
    return;
  }
  nextNode.focus();
}

function focusFirstSubtreeItem(target: HTMLElement, { treeWalker }: TreeWalkerOptions) {
  treeWalker.currentNode = target;
  const nextNode = treeWalker.nextNode();
  if (!isHTMLElementWithRole(nextNode, 'group')) {
    return;
  }
  const nextNodeFirstChild = treeWalker.firstChild();
  if (isHTMLElementWithRole(nextNodeFirstChild, 'treeitem')) {
    return nextNodeFirstChild.focus();
  }
}

function focusSubtreeOwnerItem(target: HTMLElement, { treeWalker }: TreeWalkerOptions) {
  treeWalker.currentNode = target;
  const parentNode = treeWalker.parentNode();
  if (!isHTMLElementWithRole(parentNode, 'group')) {
    return;
  }

  const grandParentNode = treeWalker.parentNode();
  if (!isHTMLElementWithRole(grandParentNode, 'treeitem')) {
    return;
  }
  grandParentNode.focus();
}
