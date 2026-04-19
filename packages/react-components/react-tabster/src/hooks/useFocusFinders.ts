'use client';

import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { findAll, findFirst, findLast, findNext, findPrev } from 'tabster/lite/focusable';

/**
 * Returns a set of helper functions that will traverse focusable elements in the context of a root DOM element
 */
export const useFocusFinders = (): {
  findAllFocusable: (container: HTMLElement | null, acceptCondition?: (el: HTMLElement) => boolean) => HTMLElement[];
  findFirstFocusable: (container: HTMLElement | null) => HTMLElement | null;
  findLastFocusable: (container: HTMLElement | null) => HTMLElement | null;
  findNextFocusable: (currentElement: HTMLElement | null, options?: { container?: HTMLElement }) => HTMLElement | null;
  findPrevFocusable: (currentElement: HTMLElement | null, options?: { container?: HTMLElement }) => HTMLElement | null;
} => {
  const { targetDocument } = useFluent();

  useIsomorphicLayoutEffect(() => {
    const doc = targetDocument ?? globalThis.document;
    if (!doc?.body) {
      return;
    }

    const isRtlDocument = (doc.documentElement?.dir ?? doc.body.getAttribute('dir')) === 'rtl';
    const hasRtlSubtree = !!doc.body.querySelector('[dir="rtl"]');
    if (isRtlDocument || hasRtlSubtree) {
      return;
    }

    const rootAttr = 'data-tabster';
    const rootValue = '{"root":{}}';
    const hadRootAttr = doc.body.hasAttribute(rootAttr);

    if (!hadRootAttr) {
      doc.body.setAttribute(rootAttr, rootValue);
    }

    return () => {
      if (!hadRootAttr && doc.body.getAttribute(rootAttr) === rootValue) {
        doc.body.removeAttribute(rootAttr);
      }
    };
  }, [targetDocument]);

  const findAllFocusable = React.useCallback(
    (container: HTMLElement | null, acceptCondition?: (el: HTMLElement) => boolean) =>
      container ? findAll({ container, filter: acceptCondition, includeProgrammaticallyFocusable: true }) : [],
    [],
  );

  const findFirstFocusable = React.useCallback(
    (container: HTMLElement | null) =>
      container ? findFirst({ container, includeProgrammaticallyFocusable: true }) : null,
    [],
  );

  const findLastFocusable = React.useCallback(
    (container: HTMLElement | null) =>
      container ? findLast({ container, includeProgrammaticallyFocusable: true }) : null,
    [],
  );

  const findNextFocusable = React.useCallback(
    (currentElement: HTMLElement | null, options: { container?: HTMLElement } = {}) =>
      currentElement ? findNext(currentElement, { ...options, includeProgrammaticallyFocusable: true }) : null,
    [],
  );

  const findPrevFocusable = React.useCallback(
    (currentElement: HTMLElement | null, options: { container?: HTMLElement } = {}) =>
      currentElement ? findPrev(currentElement, { ...options, includeProgrammaticallyFocusable: true }) : null,
    [],
  );

  return {
    findAllFocusable,
    findFirstFocusable,
    findLastFocusable,
    findNextFocusable,
    findPrevFocusable,
  };
};
