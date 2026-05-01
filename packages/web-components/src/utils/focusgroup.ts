import type { FocusGroupItemCollection } from '@microsoft/focusgroup-polyfill/shadowless';

/**
 * A {@link FocusGroupItemCollection} backed by a host-supplied array of items in DOM order.
 *
 * Stateless: every call reads from `getItems()` so the host is the single source of truth.
 * Suitable for components whose items are flat slotted children (tablist, radio-group, menu-list)
 * or any component that maintains its own ordered list of focusable descendants.
 */
export class ArrayItemCollection<T extends HTMLElement> implements FocusGroupItemCollection {
  constructor(private getItems: () => readonly T[], private getStart?: () => T | null) {}

  get start(): HTMLElement | null {
    return this.getStart?.() ?? null;
  }

  first(): HTMLElement | null {
    return this.getItems()[0] ?? null;
  }

  last(): HTMLElement | null {
    const items = this.getItems();
    return items[items.length - 1] ?? null;
  }

  next(current: HTMLElement): HTMLElement | null {
    const items = this.getItems();
    const i = items.indexOf(current as T);
    return i === -1 ? null : items[i + 1] ?? null;
  }

  previous(current: HTMLElement): HTMLElement | null {
    const items = this.getItems();
    const i = items.indexOf(current as T);
    return i <= 0 ? null : items[i - 1] ?? null;
  }

  *items(): Iterable<{ element: HTMLElement }> {
    for (const element of this.getItems()) {
      yield { element };
    }
  }

  contains(element: Element): boolean {
    return (this.getItems() as readonly Element[]).includes(element);
  }
}
