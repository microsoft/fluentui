import * as React from 'react';
import { ACTIVEDESCENDANT_ATTRIBUTE, FOCUSABLES_SELECTOR } from './constants';

export interface ActiveDescendantGridFocusableImperativeRef {
  first: () => void;
  nextRow: () => void;
  prevRow: () => void;
  focusableAbove: () => void;
  focusableBelow: () => void;
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
    return listboxRef.current?.querySelector<HTMLElement>(`
    [${ACTIVEDESCENDANT_ATTRIBUTE}]`);
  };

  const getNearestParentWithRole = (element: HTMLElement, role: string) => {
    let current: HTMLElement | null = element;
    while (current && current.role !== role) {
      current = current.parentElement;
    }
    return current;
  };

  const getSiblingRowCellFirstFocusable = (active: HTMLElement, direction: string) => {
    const currentCell = getNearestParentWithRole(active, 'gridcell');
    if (!currentCell) {
      return undefined;
    }
    const currentRow = getNearestParentWithRole(currentCell, 'row');
    if (!currentRow) {
      return undefined;
    }
    const currentRowCells = Array.from(currentRow.querySelectorAll<HTMLElement>(`[role="gridcell"]`));
    const currentCellIndex = currentRowCells.findIndex(siblingCell => siblingCell === currentCell);
    if (currentCellIndex < 0) {
      return undefined;
    }
    const siblingRow = getSiblingRow(currentRow, direction);
    if (!siblingRow) {
      return undefined;
    }
    const siblingRowCells = Array.from(siblingRow.querySelectorAll<HTMLElement>('[role="gridcell"]'));
    const siblingRowCellIndex = Math.min(siblingRowCells.length - 1, currentCellIndex);
    const siblingRowCellFirstFocusable = getFirstFocusableOrSelf(siblingRowCells[siblingRowCellIndex]);
    return siblingRowCellFirstFocusable;
  };

  const getSiblingRow = (row: HTMLElement, direction: string) => {
    const currentGrid = getNearestParentWithRole(row, 'grid');
    if (!currentGrid) {
      return undefined;
    }
    const currentGridRows = Array.from(currentGrid.querySelectorAll<HTMLElement>('[role="row"]'));
    const currentRowIndex = currentGridRows.findIndex(siblingRow => siblingRow === row);
    if (currentRowIndex < 0) {
      return undefined;
    }
    let siblingRowIndex;
    if (direction === 'next') {
      siblingRowIndex = Math.min(currentGridRows.length - 1, currentRowIndex + 1);
    } else if (direction === 'prev') {
      siblingRowIndex = Math.max(0, currentRowIndex - 1);
    }
    if (!siblingRowIndex) {
      return undefined;
    }
    return currentGridRows[siblingRowIndex];
  };

  const getFocusables = (parent: HTMLElement) => {
    return Array.from(parent.querySelectorAll<HTMLElement>(FOCUSABLES_SELECTOR)).filter(focusable => {
      return !focusable.hasAttribute('data-tabster-dummy');
    });
  };

  const getFirstFocusable = (parent: HTMLElement) => {
    return getFocusables(parent)[0];
  };

  const getFirstFocusableOrSelf = (element: HTMLElement) => {
    let focusable = getFirstFocusable(element);
    if (focusable) {
      return focusable;
    }
    return element.getAttribute('tabindex') === '0' ? element : undefined;
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
      const currentRow = getNearestParentWithRole(active, 'row');
      if (!currentRow) {
        return false;
      }
      const nextRow = getSiblingRow(currentRow, 'next');
      if (!nextRow) {
        return false;
      }
      setActiveDescendant(getNextActiveRowOrFocusable(nextRow));
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
      const currentRow = getNearestParentWithRole(active, 'row');
      if (!currentRow) {
        return false;
      }
      const prevRow = getSiblingRow(currentRow, 'prev');
      if (!prevRow) {
        return false;
      }
      setActiveDescendant(getNextActiveRowOrFocusable(prevRow));
      return true;
    },
    focusableBelow() {
      if (!listboxRef.current) {
        return false;
      }
      const active = getActiveDescendant();
      if (!active) {
        return false;
      }
      const nextRowCellFirstFocusable = getSiblingRowCellFirstFocusable(active, 'next');
      setActiveDescendant(nextRowCellFirstFocusable);
      return true;
    },
    focusableAbove() {
      if (!listboxRef.current) {
        return false;
      }
      const active = getActiveDescendant();
      if (!active) {
        return false;
      }
      const prevRowCellFirstFocusable = getSiblingRowCellFirstFocusable(active, 'prev');
      setActiveDescendant(prevRowCellFirstFocusable);
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
      const currentRow = getNearestParentWithRole(active, 'row');
      if (!currentRow) {
        return false;
      }
      const currentRowFocusables = getFocusables(currentRow);
      if (currentRow.getAttribute('tabindex') === '0') {
        currentRowFocusables.unshift(currentRow);
      }
      const activeFocusableIndex = currentRowFocusables.findIndex(focusable => focusable === active);
      if (activeFocusableIndex < 0) {
        return false;
      }
      const nextFocusableIndex = Math.min(activeFocusableIndex + 1, currentRowFocusables.length - 1);
      if (nextFocusableIndex === activeFocusableIndex) {
        return false;
      }
      setActiveDescendant(currentRowFocusables[nextFocusableIndex]);
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
      const currentRow = getNearestParentWithRole(active, 'row');
      if (!currentRow) {
        return false;
      }
      const currentRowFocusables = Array.from(currentRow.querySelectorAll<HTMLElement>(FOCUSABLES_SELECTOR));
      if (currentRow.getAttribute('tabindex') === '0') {
        currentRowFocusables.unshift(currentRow);
      }
      const activeFocusableIndex = currentRowFocusables.findIndex(focusable => focusable === active);
      if (activeFocusableIndex < 0) {
        return false;
      }
      const prevFocusableIndex = Math.max(activeFocusableIndex - 1, 0);
      if (prevFocusableIndex === activeFocusableIndex) {
        return false;
      }
      setActiveDescendant(currentRowFocusables[prevFocusableIndex]);
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
