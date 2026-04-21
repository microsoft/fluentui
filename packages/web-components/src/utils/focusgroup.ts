import type { FocusGroupItemCollection } from '@microsoft/focusgroup-polyfill/shadowless';

export class ItemCollection implements FocusGroupItemCollection {
  private owner!: HTMLElement;
  private walker!: TreeWalker;
  private filter!: (node: Element) => boolean;

  constructor(owner: HTMLElement, filter: (node: Element) => boolean) {
    this.owner = owner;
    this.filter = filter;
    this.walker = document.createTreeWalker(this.owner, NodeFilter.SHOW_ELEMENT, node =>
      filter(node as Element) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT,
    );
  }

  first() {
    this.walker.currentNode = this.owner;
    return (this.walker.nextNode() as HTMLElement) ?? null;
  }

  last() {
    this.walker.currentNode = this.owner;
    let last = null;
    while (this.walker.nextNode()) {
      last = this.walker.currentNode as HTMLElement;
    }
    return last;
  }

  next(current: HTMLElement) {
    this.walker.currentNode = current;
    return this.walker.nextNode() as HTMLElement | null;
  }

  previous(current: HTMLElement) {
    this.walker.currentNode = current;
    return this.walker.previousNode() as HTMLElement | null;
  }

  *items() {
    if (this.first()) {
      do {
        yield { element: this.walker.currentNode as HTMLElement };
      } while (this.walker.nextNode());
    }
  }

  contains(element: HTMLElement): boolean {
    return this.filter(element);
  }
}
