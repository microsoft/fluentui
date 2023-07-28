import { useControllableState } from '@fluentui/react-utilities';
import * as React from 'react';
import type { TreeCheckedChangeData, TreeProps } from './Tree.types';
import { ImmutableMap } from '../../utils/ImmutableMap';
import { createCheckedItems } from '../../utils/createCheckedItems';
import { TreeItemValue } from '../TreeItem/TreeItem.types';
import { getTreeItemValueFromElement } from '../../utils/getTreeItemValueFromElement';
import { HTMLElementWalker } from '../../utils/createHTMLElementWalker';

export function useNestedControllableCheckedItems(props: Pick<TreeProps, 'checkedItems' | 'defaultCheckedItems'>) {
  return useControllableState({
    initialState: ImmutableMap.empty,
    state: React.useMemo(() => props.checkedItems && createCheckedItems(props.checkedItems), [props.checkedItems]),
    defaultState: () => createCheckedItems(props.defaultCheckedItems),
  });
}

export function createNextNestedCheckedItems(
  data: TreeCheckedChangeData,
  previousCheckedItems: ImmutableMap<TreeItemValue, 'mixed' | boolean>,
  walker: HTMLElementWalker,
): ImmutableMap<TreeItemValue, 'mixed' | boolean> {
  if (data.selectionMode === 'single') {
    return ImmutableMap.create([[data.value, data.checked]]);
  }
  const nextCheckedItems = new Map(previousCheckedItems);
  walker.currentElement = data.target;
  for (const descendant of GenerateDescendants(walker.currentElement, walker)) {
    const descendantValue = getTreeItemValueFromElement(descendant);
    if (!descendantValue) {
      continue;
    }
    nextCheckedItems.set(descendantValue, data.checked);
  }
  nextCheckedItems.set(data.value, data.checked);

  let isAncestorsMixed = false;
  let previousParent = walker.currentElement;
  for (const parent of GenerateAncestors(walker.currentElement, walker)) {
    const parentValue = getTreeItemValueFromElement(parent);
    if (!parentValue) {
      continue;
    }
    // if one parent is mixed, all ancestors are mixed
    if (isAncestorsMixed) {
      nextCheckedItems.set(parentValue, 'mixed');
      continue;
    }
    let checkedChildrenSize = 0;
    let childrenSize = 0;
    for (const child of GenerateChildren(parent, walker)) {
      const childValue = getTreeItemValueFromElement(child);
      if (!childValue) {
        continue;
      }
      if (child !== previousParent) {
        const ariaChecked = child.getAttribute('aria-checked') as 'true' | 'false' | null;
        const currentChecked = !ariaChecked ? 'mixed' : ariaChecked === 'true';
        nextCheckedItems.set(childValue, currentChecked);
      }
      if (nextCheckedItems.get(childValue) === data.checked) {
        checkedChildrenSize++;
      }
      childrenSize++;
    }
    if (checkedChildrenSize === childrenSize) {
      nextCheckedItems.set(parentValue, data.checked);
    } else {
      // if one parent is mixed, all ancestors are mixed
      isAncestorsMixed = true;
      nextCheckedItems.set(parentValue, 'mixed');
    }
    previousParent = parent;
  }
  return ImmutableMap.dangerouslyCreate_unstable(nextCheckedItems);
}

// eslint-disable-next-line @typescript-eslint/naming-convention
function* GenerateChildren(target: HTMLElement, walker: HTMLElementWalker) {
  const root = walker.currentElement;
  walker.currentElement = target;
  let nextChild = walker.firstChild();
  while (nextChild) {
    yield nextChild;
    nextChild = walker.nextSibling();
  }
  walker.currentElement = root;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
function* GenerateDescendants(target: HTMLElement, walker: HTMLElementWalker): Generator<HTMLElement> {
  const root = walker.currentElement;
  walker.currentElement = target;
  let nextChild = walker.firstChild();
  while (nextChild) {
    yield nextChild;
    yield* GenerateDescendants(nextChild, walker);
    nextChild = walker.nextSibling();
  }
  walker.currentElement = root;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
function* GenerateAncestors(target: HTMLElement, walker: HTMLElementWalker) {
  const root = walker.currentElement;
  walker.currentElement = target;
  let nextParent = walker.parentElement();
  while (nextParent) {
    yield nextParent;
    nextParent = walker.parentElement();
  }
  walker.currentElement = root;
}
