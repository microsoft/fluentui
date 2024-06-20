import { isHTMLElement } from '@fluentui/react-utilities';

export interface HTMLElementWalker {
  readonly root: HTMLElement;
  currentElement: HTMLElement;
  firstChild(filter?: HTMLElementFilter): HTMLElement | null;
  lastChild(filter?: HTMLElementFilter): HTMLElement | null;
  nextElement(filter?: HTMLElementFilter): HTMLElement | null;
  nextSibling(filter?: HTMLElementFilter): HTMLElement | null;
  parentElement(filter?: HTMLElementFilter): HTMLElement | null;
  previousElement(filter?: HTMLElementFilter): HTMLElement | null;
  previousSibling(filter?: HTMLElementFilter): HTMLElement | null;
}

export type HTMLElementFilter = (element: HTMLElement) => number;

export function createHTMLElementWalker(
  root: HTMLElement,
  targetDocument: Document,
  filter: HTMLElementFilter = () => NodeFilter.FILTER_ACCEPT,
): HTMLElementWalker {
  let temporaryFilter: HTMLElementFilter | undefined;
  const treeWalker = targetDocument.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
    acceptNode(node: Node) {
      if (!isHTMLElement(node)) {
        return NodeFilter.FILTER_REJECT;
      }
      const filterResult = filter(node);
      return filterResult === NodeFilter.FILTER_ACCEPT ? temporaryFilter?.(node) ?? filterResult : filterResult;
    },
  });
  return {
    get root() {
      return treeWalker.root as HTMLElement;
    },
    get currentElement() {
      return treeWalker.currentNode as HTMLElement;
    },
    set currentElement(element) {
      treeWalker.currentNode = element;
    },
    firstChild: localFilter => {
      temporaryFilter = localFilter;
      const result = treeWalker.firstChild() as HTMLElement | null;
      temporaryFilter = undefined;
      return result;
    },
    lastChild: localFilter => {
      temporaryFilter = localFilter;
      const result = treeWalker.lastChild() as HTMLElement | null;
      temporaryFilter = undefined;
      return result;
    },
    nextElement: localFilter => {
      temporaryFilter = localFilter;
      const result = treeWalker.nextNode() as HTMLElement | null;
      temporaryFilter = undefined;
      return result;
    },
    nextSibling: localFilter => {
      temporaryFilter = localFilter;
      const result = treeWalker.nextSibling() as HTMLElement | null;
      temporaryFilter = undefined;
      return result;
    },
    parentElement: localFilter => {
      temporaryFilter = localFilter;
      const result = treeWalker.parentNode() as HTMLElement | null;
      temporaryFilter = undefined;
      return result;
    },
    previousElement: localFilter => {
      temporaryFilter = localFilter;
      const result = treeWalker.previousNode() as HTMLElement | null;
      temporaryFilter = undefined;
      return result;
    },
    previousSibling: localFilter => {
      temporaryFilter = localFilter;
      const result = treeWalker.previousSibling() as HTMLElement | null;
      temporaryFilter = undefined;
      return result;
    },
  };
}
