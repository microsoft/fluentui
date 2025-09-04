import * as React from 'react';
import { Types as TabsterTypes } from 'tabster';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { useTabster } from './useTabster';

/**
 * Returns a set of helper functions that will traverse focusable elements in the context of a root DOM element
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
  const tabsterRef = useTabster();
  const { targetDocument } = useFluent();

  // Narrow props for now and let need dictate additional props in the future
  const findAllFocusable = React.useCallback(
    (container: HTMLElement | null, acceptCondition?: (el: HTMLElement) => boolean) =>
      (container && tabsterRef.current?.focusable.findAll({ container, acceptCondition })) || [],
    [tabsterRef],
  );

  const findFirstFocusable = React.useCallback(
    (container: HTMLElement | null) => container && tabsterRef.current?.focusable.findFirst({ container }),
    [tabsterRef],
  );

  const findLastFocusable = React.useCallback(
    (container: HTMLElement | null) => container && tabsterRef.current?.focusable.findLast({ container }),
    [tabsterRef],
  );

  const findNextFocusable = React.useCallback(
    (currentElement: HTMLElement | null, options: Pick<Partial<TabsterTypes.FindNextProps>, 'container'> = {}) => {
      if (!tabsterRef.current || !targetDocument || !currentElement) {
        return null;
      }

      const { container = targetDocument.body } = options;

      return tabsterRef.current.focusable.findNext({ currentElement, container });
    },
    [tabsterRef, targetDocument],
  );

  const findPrevFocusable = React.useCallback(
    (currentElement: HTMLElement | null, options: Pick<Partial<TabsterTypes.FindNextProps>, 'container'> = {}) => {
      if (!tabsterRef.current || !targetDocument || !currentElement) {
        return null;
      }

      const { container = targetDocument.body } = options;

      return tabsterRef.current.focusable.findPrev({ currentElement, container });
    },
    [tabsterRef, targetDocument],
  );

  return {
    findAllFocusable,
    findFirstFocusable,
    findLastFocusable,
    findNextFocusable,
    findPrevFocusable,
  };
};
