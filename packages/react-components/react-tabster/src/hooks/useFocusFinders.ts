'use client';

import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { findAll, findFirst, findLast, findNext, findPrev } from '../focus-navigation/focusableFinder';

/**
 * Returns a set of helper functions that will traverse focusable elements
 * in the context of a root DOM element.
 *
 * Replaces the tabster.focusable API with a custom DOM-walker implementation.
 */
export const useFocusFinders = (): {
  findAllFocusable: (container: HTMLElement | null, acceptCondition?: (el: HTMLElement) => boolean) => HTMLElement[];
  findFirstFocusable: (container: HTMLElement | null) => HTMLElement | null | undefined;
  findLastFocusable: (container: HTMLElement | null) => HTMLElement | null | undefined;
  findNextFocusable: (
    currentElement: HTMLElement | null,
    options?: { container?: HTMLElement },
  ) => HTMLElement | null | undefined;
  findPrevFocusable: (
    currentElement: HTMLElement | null,
    options?: { container?: HTMLElement },
  ) => HTMLElement | null | undefined;
} => {
  const { targetDocument } = useFluent();

  const findAllFocusable = React.useCallback(
    (container: HTMLElement | null, acceptCondition?: (el: HTMLElement) => boolean) =>
      findAll(container, acceptCondition),
    [],
  );

  const findFirstFocusable = React.useCallback((container: HTMLElement | null) => findFirst(container), []);

  const findLastFocusable = React.useCallback((container: HTMLElement | null) => findLast(container), []);

  const findNextFocusable = React.useCallback(
    (currentElement: HTMLElement | null, options: { container?: HTMLElement } = {}) => {
      if (!currentElement || !targetDocument) return null;
      const container = options.container ?? (targetDocument.body as HTMLElement);
      return findNext(currentElement, container);
    },
    [targetDocument],
  );

  const findPrevFocusable = React.useCallback(
    (currentElement: HTMLElement | null, options: { container?: HTMLElement } = {}) => {
      if (!currentElement || !targetDocument) return null;
      const container = options.container ?? (targetDocument.body as HTMLElement);
      return findPrev(currentElement, container);
    },
    [targetDocument],
  );

  return {
    findAllFocusable,
    findFirstFocusable,
    findLastFocusable,
    findNextFocusable,
    findPrevFocusable,
  };
};
