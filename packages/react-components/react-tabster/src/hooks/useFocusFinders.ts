import * as React from 'react';
import { Types as TabsterTypes } from 'tabster';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { useTabster } from './useTabster';

/**
 * Returns a set of helper functions that will traverse focusable elements in the context of a root DOM element
 */
export const useFocusFinders = () => {
  const tabsterRef = useTabster();
  const { targetDocument } = useFluent();

  // Narrow props for now and let need dictate additional props in the future
  const findAllFocusable = React.useCallback(
    (container: HTMLElement, acceptCondition?: (el: HTMLElement) => boolean) =>
      tabsterRef.current?.focusable.findAll({ container, acceptCondition }) || [],
    [tabsterRef],
  );

  const findFirstFocusable = React.useCallback(
    (container: HTMLElement) => tabsterRef.current?.focusable.findFirst({ container }),
    [tabsterRef],
  );

  const findLastFocusable = React.useCallback(
    (container: HTMLElement) => tabsterRef.current?.focusable.findLast({ container }),
    [tabsterRef],
  );

  const findNextFocusable = React.useCallback(
    (currentElement: HTMLElement, options: Pick<Partial<TabsterTypes.FindNextProps>, 'container'> = {}) => {
      if (!tabsterRef.current || !targetDocument) {
        return null;
      }

      const { container = targetDocument.body } = options;

      return tabsterRef.current.focusable.findNext({ currentElement, container });
    },
    [tabsterRef, targetDocument],
  );

  const findPrevFocusable = React.useCallback(
    (currentElement: HTMLElement, options: Pick<Partial<TabsterTypes.FindNextProps>, 'container'> = {}) => {
      if (!tabsterRef.current || !targetDocument) {
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
