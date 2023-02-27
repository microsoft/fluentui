import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, End, Home } from '@fluentui/keyboard-keys';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { isHTMLElement } from '@fluentui/react-utilities';
import { TreeNavigationData_unstable } from '../Tree';
import { filterTreeItem } from '../utils/filterTreeItemAndGroup';
import { isHTMLElementWithRole } from '../utils/isHTMLElementWithRole';
import { useDOMTreeWalker } from './useDOMTreeWalker';
import type { TreeItemPropsReferences } from './useFlatTreeItems';
import { focusTypeAhead } from './useNestedTreeNavigation';

export function useFlatTreeNavigation(references: TreeItemPropsReferences) {
  const { targetDocument } = useFluent_unstable();
  const [treeWalkerRef, rootRef] = useDOMTreeWalker(NodeFilter.SHOW_ELEMENT, {
    acceptNode: filterTreeItem,
  });

  function navigate(data: TreeNavigationData_unstable) {
    const { current: treeWalker } = treeWalkerRef;
    if (!treeWalker || !targetDocument) {
      return;
    }
    switch (data.type) {
      case ArrowLeft:
        return focusSubtreeOwnerItem(data.target, { references, document: targetDocument });
      case ArrowRight:
        return focusFirstSubtreeItem(data.target, { treeWalker });
      case 'TypeAhead':
        return focusTypeAhead(data.target, { treeWalker, key: data.event.key });
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

function focusFirstSubtreeItem(target: HTMLElement, { treeWalker }: TreeWalkerOptions) {
  treeWalker.currentNode = target;
  const nextNode = treeWalker.nextNode();
  if (!isHTMLElementWithRole(nextNode, 'treeitem')) {
    return;
  }
  const nextNodeAriaPosInSet = nextNode.getAttribute('aria-posinset');
  const nextNodeAriaLevel = nextNode.getAttribute('aria-level');
  const targetAriaLevel = target.getAttribute('aria-level');
  if (nextNodeAriaPosInSet === '1' && Number(nextNodeAriaLevel) === Number(targetAriaLevel) + 1) {
    nextNode.focus();
  }
}

function focusSubtreeOwnerItem(
  target: HTMLElement,
  { references, document }: { references: TreeItemPropsReferences; document: Document },
) {
  const treeItemPropsRef = references.get(target.id);
  if (treeItemPropsRef && treeItemPropsRef.parentId) {
    const parentElement = document.getElementById(treeItemPropsRef.parentId);
    parentElement?.focus();
  }
}

function focusFirstTreeItem({ treeWalker }: TreeWalkerOptions) {
  treeWalker.currentNode = treeWalker.root;
  const nextNode = treeWalker.firstChild();
  if (!isHTMLElement(nextNode)) {
    return;
  }
  nextNode.focus();
}

function focusLastTreeItem({ treeWalker }: TreeWalkerOptions) {
  treeWalker.currentNode = treeWalker.root;
  const nextNode = treeWalker.lastChild();
  if (!isHTMLElement(nextNode)) {
    return;
  }
  nextNode.focus();
}

function focusPreviousTreeItem(target: HTMLElement, { treeWalker }: TreeWalkerOptions) {
  treeWalker.currentNode = target;
  const previousNode = treeWalker.previousNode();
  if (!isHTMLElement(previousNode)) {
    return;
  }
  previousNode.focus();
}

function focusNextTreeItem(target: HTMLElement, { treeWalker }: TreeWalkerOptions) {
  treeWalker.currentNode = target;
  const nextNode = treeWalker.nextNode();
  if (!isHTMLElement(nextNode)) {
    return;
  }
  nextNode.focus();
}
