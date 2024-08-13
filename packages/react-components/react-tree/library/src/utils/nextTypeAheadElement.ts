import { HTMLElementWalker } from './createHTMLElementWalker';

export function nextTypeAheadElement(treeWalker: HTMLElementWalker, key: string) {
  const keyToLowerCase = key.toLowerCase();
  const typeAheadFilter = (element: HTMLElement) => {
    return element.textContent?.trim().charAt(0).toLowerCase() === keyToLowerCase
      ? NodeFilter.FILTER_ACCEPT
      : NodeFilter.FILTER_SKIP;
  };
  let nextElement = treeWalker.nextElement(typeAheadFilter);
  if (!nextElement) {
    treeWalker.currentElement = treeWalker.root;
    nextElement = treeWalker.nextElement(typeAheadFilter);
  }
  return nextElement;
}
