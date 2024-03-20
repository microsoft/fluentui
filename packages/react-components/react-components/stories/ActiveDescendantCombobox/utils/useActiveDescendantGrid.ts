import * as React from 'react';
import { isHTMLElement } from '@fluentui/react-utilities';
import { ACTIVEDESCENDANT_ATTRIBUTE } from './constants';

export interface ActiveDescendantGridImperativeRef {
  first: () => void;
  nextRow: () => void;
  prevRow: () => void;
  nextCell: () => void;
  prevCell: () => void;
  blur: () => void;
  active: () => string | undefined;
  focus: (id: string) => void;
}

export function useActiveDescendantGrid(imperativeRef: React.RefObject<ActiveDescendantGridImperativeRef>) {
  const activeParentRef = React.useRef<HTMLInputElement>(null);
  const treeWalkerRef = React.useRef<TreeWalker>();
  const listboxRef = React.useRef<HTMLDivElement | null>(null);

  const listboxCbRef = React.useCallback((el: HTMLDivElement | null) => {
    if (el) {
      listboxRef.current = el;
      treeWalkerRef.current = el.ownerDocument.createTreeWalker(listboxRef.current, NodeFilter.SHOW_ELEMENT, node => {
        if (!isHTMLElement(node)) {
          return NodeFilter.FILTER_SKIP;
        }

        return node.role === 'row' ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      });
    }
  }, []);

  const getActiveDescendant = () => {
    return listboxRef.current?.querySelector<HTMLElement>(`[${ACTIVEDESCENDANT_ATTRIBUTE}]`);
  };

  const getParentRow = (el: HTMLElement) => {
    let cur: HTMLElement | null = el;
    while (cur && cur.role !== 'row') {
      cur = cur.parentElement;
    }

    return cur;
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
      if (!listboxRef.current || !treeWalkerRef.current) {
        return false;
      }

      treeWalkerRef.current.currentNode = listboxRef.current;
      const firstRow = treeWalkerRef.current.firstChild() as HTMLElement | null;
      if (!firstRow) {
        return false;
      }

      setActiveDescendant(firstRow.querySelector<HTMLElement>(`[role="gridcell"]`) ?? undefined);
    },
    nextRow() {
      if (!listboxRef.current || !treeWalkerRef.current) {
        return;
      }

      const active = getActiveDescendant();
      if (!active) {
        return false;
      }

      const activeRow = getParentRow(active);
      if (!activeRow) {
        return false;
      }

      const activeRowCells = Array.from(activeRow.querySelectorAll<HTMLElement>(`[role="gridcell"]`));
      const activeCellIndex = activeRowCells.findIndex(x => x === active);
      if (activeCellIndex < 0) {
        return false;
      }

      treeWalkerRef.current.currentNode = active;
      const nextActiveRow = treeWalkerRef.current.nextNode() as HTMLElement | null;
      if (!nextActiveRow) {
        return false;
      }

      const nextActiveRowCells = Array.from(nextActiveRow.querySelectorAll<HTMLElement>(`[role="gridcell"]`));
      const nextActiveCellIndex = Math.min(nextActiveRowCells.length - 1, activeCellIndex);
      setActiveDescendant(nextActiveRowCells[nextActiveCellIndex]);

      return true;
    },
    prevRow() {
      if (!listboxRef.current || !treeWalkerRef.current) {
        return;
      }

      const active = getActiveDescendant();
      if (!active) {
        return false;
      }

      const activeRow = getParentRow(active);
      if (!activeRow) {
        return false;
      }

      const activeRowCells = Array.from(activeRow.querySelectorAll<HTMLElement>(`[role="gridcell"]`));
      const activeCellIndex = activeRowCells.findIndex(x => x === active);
      if (activeCellIndex < 0) {
        return false;
      }

      treeWalkerRef.current.currentNode = active;
      treeWalkerRef.current.previousNode();
      const nextActiveRow = treeWalkerRef.current.previousNode() as HTMLElement | null;
      if (!nextActiveRow) {
        return false;
      }

      const nextActiveRowCells = Array.from(nextActiveRow.querySelectorAll<HTMLElement>(`[role="gridcell"]`));
      const nextActiveCellIndex = Math.min(nextActiveRowCells.length, activeCellIndex);
      setActiveDescendant(nextActiveRowCells[nextActiveCellIndex]);

      return true;
    },
    nextCell() {
      if (!listboxRef.current || !treeWalkerRef.current) {
        return;
      }

      const active = getActiveDescendant();
      if (!active) {
        return false;
      }

      const activeRow = getParentRow(active);
      if (!activeRow) {
        return false;
      }

      const activeRowCells = Array.from(activeRow.querySelectorAll<HTMLElement>(`[role="gridcell"]`));
      const activeCellIndex = activeRowCells.findIndex(x => x === active);
      if (activeCellIndex < 0) {
        return false;
      }

      const nextActiveCellIndex = Math.min(activeCellIndex + 1, activeRowCells.length - 1);
      if (nextActiveCellIndex === activeCellIndex) {
        return false;
      }
      setActiveDescendant(activeRowCells[nextActiveCellIndex]);
      return true;
    },
    prevCell() {
      if (!listboxRef.current || !treeWalkerRef.current) {
        return;
      }

      const active = getActiveDescendant();
      if (!active) {
        return false;
      }

      const activeRow = getParentRow(active);
      if (!activeRow) {
        return false;
      }

      const activeRowCells = Array.from(activeRow.querySelectorAll<HTMLElement>(`[role="gridcell"]`));
      const activeCellIndex = activeRowCells.findIndex(x => x === active);
      if (activeCellIndex < 0) {
        return false;
      }

      const nextActiveCellIndex = Math.max(activeCellIndex - 1, 0);
      if (nextActiveCellIndex === activeCellIndex) {
        return false;
      }
      setActiveDescendant(activeRowCells[nextActiveCellIndex]);
      return true;
    },
    blur() {
      if (!activeParentRef.current) {
        return;
      }

      setActiveDescendant(undefined);
    },
    focus(id) {
      if (!listboxRef.current || !treeWalkerRef.current) {
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
