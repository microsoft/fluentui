import type { FocusGroupItemCollection } from '@microsoft/focusgroup-polyfill/shadowless';

interface ItemCollectionInit {
  owner: HTMLElement;
  list?: HTMLElement[];
  filter?: NodeFilter;
}

export class ItemCollection extends EventTarget implements FocusGroupItemCollection {
  #owner!: HTMLElement;
  #list: HTMLElement[] = [];
  #currentIndex = 0;
  #walker?: TreeWalker;
  #filter?: NodeFilter;

  constructor({ owner, list, filter }: ItemCollectionInit) {
    super();

    this.#owner = owner;

    if (list) {
      this.#list = list;
    } else if (filter) {
      this.#filter = filter;
      this.#walker = document.createTreeWalker(this.#owner, NodeFilter.SHOW_ELEMENT, filter);
    }
  }

  first() {
    if (this.#walker) {
      this.#walker.currentNode = this.#owner;
      return (this.#walker.nextNode() as HTMLElement) ?? null;
    } else {
      this.#currentIndex = 0;
      return this.#list[this.#currentIndex] ?? null;
    }
  }

  last() {
    if (this.#walker) {
      this.#walker.currentNode = this.#owner;
      let last = null;
      while (this.#walker.nextNode()) {
        last = this.#walker.currentNode as HTMLElement;
      }
      return last;
    } else {
      this.#currentIndex = this.#list?.length - 1;
      return this.#list[this.#currentIndex] ?? null;
    }
  }

  next(current: HTMLElement) {
    if (this.#walker) {
      this.#walker.currentNode = current;
      return this.#walker.nextNode() as HTMLElement | null;
    } else {
      this.#currentIndex = this.#list.indexOf(current);
      const element = this.#list[this.#currentIndex + 1];
      this.#currentIndex = Math.min(this.#currentIndex + 1, this.#list.length - 1);
      return element ?? null;
    }
  }

  previous(current: HTMLElement) {
    if (this.#walker) {
      this.#walker.currentNode = current;
      return this.#walker.previousNode() as HTMLElement | null;
    } else {
      this.#currentIndex = this.#list.indexOf(current);
      const element = this.#list[this.#currentIndex - 1];
      this.#currentIndex = Math.max(this.#currentIndex - 1, 0);
      return element ?? null;
    }
  }

  *items() {
    if (this.#walker) {
      this.first();
      do {
        yield { element: this.#walker.currentNode as HTMLElement };
      } while (this.#walker.nextNode());
    } else {
      for (const element of this.#list) {
        yield { element };
      }
    }
  }

  contains(element: HTMLElement): boolean {
    return this.#filter
      ? !([NodeFilter.FILTER_REJECT, NodeFilter.FILTER_SKIP] as number[]).includes(
          'acceptNode' in this.#filter ? this.#filter.acceptNode(element) : this.#filter(element),
        )
      : this.#list.includes(element);
  }
}
