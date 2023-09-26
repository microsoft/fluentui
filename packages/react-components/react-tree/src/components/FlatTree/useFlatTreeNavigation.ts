import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { useEventCallback } from '@fluentui/react-utilities';
import { TreeNavigationData_unstable } from '../../Tree';
import { nextTypeAheadElement } from '../../utils/nextTypeAheadElement';
import { treeDataTypes } from '../../utils/tokens';
import { treeItemFilter } from '../../utils/treeItemFilter';
import { useRovingTabIndex } from '../../hooks/useRovingTabIndexes';
import { HTMLElementWalker } from '../../utils/createHTMLElementWalker';
import { TreeItemValue } from '../../TreeItem';
import { dataTreeItemValueAttrName } from '../../utils/getTreeItemValueFromElement';

export function useFlatTreeNavigation() {
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
      case treeDataTypes.ArrowLeft: {
        const nextElement = parentElement(data.parentValue, walker);
        if (!nextElement && process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line no-console
          console.warn(
            /* #__DE-INDENT__ */ `
            @fluentui/react-tree [useFlatTreeNavigation]:
            \'ArrowLeft\' navigation was not possible.
            No parent element found for the current element:
          `,
            data.target,
          );
        }
        return nextElement;
      }
      case treeDataTypes.ArrowRight: {
        walker.currentElement = data.target;
        const nextElement = firstChild(data.target, walker);
        if (!nextElement && process.env.NODE_ENV !== 'production') {
          const ariaLevel = Number(data.target.getAttribute('aria-level'));
          // eslint-disable-next-line no-console
          console.warn(
            /* #__DE-INDENT__ */ `
            @fluentui/react-tree [useFlatTreeNavigation]:
            \'ArrowRight\' navigation was not possible.
            No element with "aria-posinset=1" and "aria-level=${ariaLevel + 1}"
            was found after the current element!
          `,
            data.target,
          );
        }
        return nextElement;
      }
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

function parentElement(parentValue: TreeItemValue | undefined, treeWalker: HTMLElementWalker) {
  if (parentValue === undefined) {
    return null;
  }
  return treeWalker.root.querySelector<HTMLElement>(`[${dataTreeItemValueAttrName}="${parentValue}"]`);
}
