'use client';

import * as React from 'react';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { isHTMLElement, useEventCallback, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import type { ListNavigationMode } from './List.types';

const ListNavigationContext = React.createContext<ListNavigationMode | undefined>(undefined);

export const ListNavigationProvider = ListNavigationContext.Provider;
export const useListNavigationMode = (): ListNavigationMode | undefined => React.useContext(ListNavigationContext);

const authorTabIndices = new WeakMap<HTMLElement, { attribute: string | null; tabIndex: number }>();

const getAuthorTabIndex = (element: HTMLElement): number =>
  !element.hasAttribute('tabindex') &&
  element.matches(
    '[contenteditable=""], [contenteditable="true" i], [contenteditable="plaintext-only" i], audio[controls], video[controls]',
  )
    ? 0
    : element.tabIndex;

const isAvailable = (element: HTMLElement): boolean => {
  if (element.matches(':disabled, input[type="hidden"]') || element.closest('[hidden], [inert]')) {
    return false;
  }
  const view = element.ownerDocument.defaultView;
  for (let current: HTMLElement | null = element; current; current = current.parentElement) {
    const style = view?.getComputedStyle(current);
    if (style?.display === 'none' || style?.visibility === 'hidden' || style?.visibility === 'collapse') {
      return false;
    }
  }
  return true;
};

export const getListFocusableElements = (root: HTMLElement): HTMLElement[] =>
  Array.from(root.querySelectorAll<HTMLElement>('*')).filter(
    element => (authorTabIndices.get(element)?.tabIndex ?? getAuthorTabIndex(element)) >= 0 && isAvailable(element),
  );

/**
 * Composite grids need a roving tab stop until focusgroup supports their row/control model.
 * Keep author tabindex values separate so explicit opt-outs survive focus movement and cleanup.
 */
export const useCompositeListNavigation = (
  navigationMode: ListNavigationMode | undefined,
  rootRef: React.RefObject<HTMLElement | null>,
): React.FocusEventHandler<HTMLElement> => {
  const { targetDocument } = useFluent_unstable();
  const current = React.useRef<HTMLElement | null>(null);
  const managed = React.useRef(new Set<HTMLElement>());
  const observer = React.useRef<MutationObserver | undefined>(undefined);

  const reconcile = useEventCallback((records: MutationRecord[] = []) => {
    const root = rootRef.current;
    if (!root || navigationMode !== 'composite') {
      return;
    }
    for (const record of [...records, ...(observer.current?.takeRecords() ?? [])]) {
      if (
        record.attributeName === 'tabindex' &&
        isHTMLElement(record.target) &&
        record.target.closest('[data-list]') === root
      ) {
        authorTabIndices.set(record.target, {
          attribute: record.target.getAttribute('tabindex'),
          tabIndex: getAuthorTabIndex(record.target),
        });
      }
    }

    const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-navigable]')).filter(
      element =>
        element.closest('[data-list]') === root &&
        (authorTabIndices.get(element)?.tabIndex ?? getAuthorTabIndex(element)) >= 0 &&
        isAvailable(element),
    );
    const elements = rows.flatMap(row => [
      row,
      ...getListFocusableElements(row).filter(
        element => element.closest('[data-navigable]') === row && element.closest('[data-list]') === root,
      ),
    ]);
    const nextManaged = new Set(elements);

    for (const element of managed.current) {
      if (!nextManaged.has(element)) {
        const original = authorTabIndices.get(element);
        if (original?.attribute === null) {
          element.removeAttribute('tabindex');
        } else if (original) {
          element.setAttribute('tabindex', original.attribute);
        }
        authorTabIndices.delete(element);
      }
    }

    if (!current.current || !nextManaged.has(current.current)) {
      current.current = rows[0] ?? null;
    }
    for (const element of elements) {
      if (!authorTabIndices.has(element)) {
        authorTabIndices.set(element, {
          attribute: element.getAttribute('tabindex'),
          tabIndex: getAuthorTabIndex(element),
        });
      }
      const tabIndex = element === current.current ? 0 : -1;
      if (element.tabIndex !== tabIndex) {
        element.tabIndex = tabIndex;
      }
    }
    managed.current = nextManaged;
    observer.current?.takeRecords();
  });

  useIsomorphicLayoutEffect(() => {
    if (navigationMode !== 'composite' || !rootRef.current) {
      return;
    }
    const MutationObserver = targetDocument?.defaultView?.MutationObserver;
    if (MutationObserver) {
      observer.current = new MutationObserver(records => {
        reconcile(records);
      });
      observer.current.observe(rootRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: [
          'tabindex',
          'disabled',
          'hidden',
          'inert',
          'href',
          'type',
          'contenteditable',
          'style',
          'class',
        ],
      });
    }
    reconcile();

    return () => {
      observer.current?.disconnect();
      observer.current = undefined;
      for (const element of managed.current) {
        const original = authorTabIndices.get(element);
        if (original?.attribute === null) {
          element.removeAttribute('tabindex');
        } else if (original) {
          element.setAttribute('tabindex', original.attribute);
        }
        authorTabIndices.delete(element);
      }
      managed.current.clear();
      current.current = null;
    };
  }, [navigationMode, reconcile, rootRef, targetDocument]);

  return useEventCallback(event => {
    const root = rootRef.current;
    if (navigationMode === 'composite' && isHTMLElement(event.target) && event.target.closest('[data-list]') === root) {
      current.current = event.target;
      reconcile();
    }
  });
};
