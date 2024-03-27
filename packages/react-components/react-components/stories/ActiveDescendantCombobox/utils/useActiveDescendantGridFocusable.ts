import * as React from 'react';
import { isHTMLElement } from '@fluentui/react-utilities';
import { ACTIVEDESCENDANT_ATTRIBUTE, FOCUSABLES_SELECTOR } from './constants';

export interface ActiveDescendantGridFocusableImperativeRef {
  first: () => void;
  nextRow: () => void;
  prevRow: () => void;
  nextFocusable: () => void;
  prevFocusable: () => void;
  blur: () => void;
  active: () => string | undefined;
  focus: (id: string) => void;
}

export function useActiveDescendantGridFocusable(
  imperativeRef: React.RefObject<ActiveDescendantGridFocusableImperativeRef>,
) {
  const activeParentRef = React.useRef<HTMLInputElement>(null);
  const listboxRef = React.useRef<HTMLDivElement | null>(null);

  const listboxCbRef = React.useCallback((el: HTMLDivElement | null) => {
    if (el) {
      listboxRef.current = el;
    }
  }, []);

  const getActiveDescendant = () => {
    return listboxRef.current?.querySelector<HTMLElement>(`[${ACTIVEDESCENDANT_ATTRIBUTE}]`);
  };

  const getParentGrid = (el: HTMLElement) => {
    let cur: HTMLElement | null = el;
    while (cur && cur.role !== 'grid') {
      cur = cur.parentElement;
    }

    return cur;
  };

  const getParentRow = (el: HTMLElement) => {
    let cur: HTMLElement | null = el;
    while (cur && cur.role !== 'row') {
      cur = cur.parentElement;
    }

    return cur;
  };

  const getFocusables = (parent: HTMLElement) => {
    return Array.from(parent.querySelectorAll<HTMLElement>(FOCUSABLES_SELECTOR)).filter(focusable => {
      return !focusable.hasAttribute('data-tabster-dummy');
    });
  };

  const getFirstFocusable = (parent: HTMLElement) => {
    return getFocusables(parent)[0];
  };

  const getNextActiveRowOrFocusable = (nextActiveRow: HTMLElement) => {
    let nextActive;
    if (nextActiveRow.getAttribute('tabindex') === '0') {
      nextActive = nextActiveRow;
    } else {
      nextActive = getFirstFocusable(nextActiveRow);
    }
    return nextActive;
  };

  const scrollActiveIntoView = (active: HTMLElement) => {
    if (!listboxRef.current) {
      return;
    }

    if (listboxRef.current.offsetHeight >= listboxRef.current.scrollHeight) {
      return;
    }

    const { offsetHeight, offsetTop } = active;
    const { offsetHeight: parentOffsetHeight, scrollTop } = listboxRef.current;

    const isAbove = offsetTop < scrollTop;
    const isBelow = offsetTop + offsetHeight > scrollTop + parentOffsetHeight;

    const buffer = 2;

    if (isAbove) {
      listboxRef.current.scrollTo(0, offsetTop - buffer);
    }

    if (isBelow) {
      listboxRef.current.scrollTo(0, offsetTop - parentOffsetHeight + offsetHeight + buffer);
    }
  };

  const setActiveDescendant = (nextActive: HTMLElement | undefined) => {
    const active = getActiveDescendant();
    if (active) {
      active.removeAttribute(ACTIVEDESCENDANT_ATTRIBUTE);
    }

    if (nextActive) {
      nextActive.setAttribute(ACTIVEDESCENDANT_ATTRIBUTE, '');
      scrollActiveIntoView(nextActive);
      activeParentRef.current?.setAttribute(
        'aria-activedescendant',
        nextActive.id || (nextActive.getAttribute('data-active-id') ?? ''),
      );
    } else {
      activeParentRef.current?.removeAttribute('aria-activedescendant');
    }
  };

  React.useImperativeHandle(imperativeRef, () => ({
    first() {
      if (!listboxRef.current) {
        return false;
      }

      const firstRow = listboxRef.current?.querySelector<HTMLElement>('[role="row"]');
      if (!firstRow) {
        return false;
      }

      setActiveDescendant(getNextActiveRowOrFocusable(firstRow));
    },
    nextRow() {
      if (!listboxRef.current) {
        return false;
      }

      const active = getActiveDescendant();
      if (!active) {
        return false;
      }

      const activeRow = getParentRow(active);
      if (!activeRow) {
        return false;
      }

      const grid = getParentGrid(activeRow);
      if (!grid) {
        return false;
      }

      const rows = Array.from(grid.querySelectorAll<HTMLElement>(`[role="row"]`));
      const activeRowIndex = rows.findIndex(x => x === activeRow);
      if (activeRowIndex < 0) {
        return false;
      }

      const nextActiveRowIndex = Math.min(rows.length - 1, activeRowIndex + 1);
      const nextActiveRow = rows[nextActiveRowIndex];
      setActiveDescendant(getNextActiveRowOrFocusable(nextActiveRow));

      return true;
    },
    prevRow() {
      if (!listboxRef.current) {
        return false;
      }

      const active = getActiveDescendant();
      if (!active) {
        return false;
      }

      const activeRow = getParentRow(active);
      if (!activeRow) {
        return false;
      }

      const grid = getParentGrid(activeRow);
      if (!grid) {
        return false;
      }

      const rows = Array.from(grid.querySelectorAll<HTMLElement>(`[role="row"]`));
      const activeRowIndex = rows.findIndex(x => x === activeRow);
      if (activeRowIndex < 0) {
        return false;
      }

      const nextActiveRowIndex = Math.max(0, activeRowIndex - 1);
      const nextActiveRow = rows[nextActiveRowIndex];
      setActiveDescendant(getNextActiveRowOrFocusable(nextActiveRow));

      return true;
    },
    nextFocusable() {
      if (!listboxRef.current) {
        return false;
      }

      const active = getActiveDescendant();
      if (!active) {
        return false;
      }

      const activeRow = getParentRow(active);
      if (!activeRow) {
        return false;
      }

      const activeRowFocusables = getFocusables(activeRow);
      if (activeRow.getAttribute('tabindex') === '0') {
        activeRowFocusables.unshift(activeRow);
      }
      const activeFocusableIndex = activeRowFocusables.findIndex(x => x === active);
      if (activeFocusableIndex < 0) {
        return false;
      }

      const nextActiveFocusableIndex = Math.min(activeFocusableIndex + 1, activeRowFocusables.length - 1);
      if (nextActiveFocusableIndex === activeFocusableIndex) {
        return false;
      }
      setActiveDescendant(activeRowFocusables[nextActiveFocusableIndex]);
      return true;
    },
    prevFocusable() {
      if (!listboxRef.current) {
        return false;
      }

      const active = getActiveDescendant();
      if (!active) {
        return false;
      }

      const activeRow = getParentRow(active);
      if (!activeRow) {
        return false;
      }

      const activeRowFocusables = Array.from(activeRow.querySelectorAll<HTMLElement>(FOCUSABLES_SELECTOR));
      if (activeRow.getAttribute('tabindex') === '0') {
        activeRowFocusables.unshift(activeRow);
      }

      const activeFocusableIndex = activeRowFocusables.findIndex(x => x === active);
      if (activeFocusableIndex < 0) {
        return false;
      }

      const nextActiveFocusableIndex = Math.max(activeFocusableIndex - 1, 0);
      if (nextActiveFocusableIndex === activeFocusableIndex) {
        return false;
      }
      setActiveDescendant(activeRowFocusables[nextActiveFocusableIndex]);
      return true;
    },
    blur() {
      if (!activeParentRef.current) {
        return;
      }

      setActiveDescendant(undefined);
    },
    focus(id) {
      if (!listboxRef.current) {
        return;
      }

      const active = getActiveDescendant();
      if (!active) {
        return;
      }

      const el = listboxRef.current.querySelector<HTMLElement>(`#${id}`);

      if (el) {
        setActiveDescendant(el);
      }
    },
    active() {
      const active = getActiveDescendant();
      if (!active) {
        return undefined;
      }
      return active.id || (active.getAttribute('data-active-id') ?? undefined);
    },
  }));
  return { listboxRef: listboxCbRef, activeParentRef };
}
