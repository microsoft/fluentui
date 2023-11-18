import * as React from 'react';
import { Types as TabsterTypes } from 'tabster';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { useTabster } from './useTabster';

/**
 * Returns a set of helper functions that will traverse focusable elements in the context of a root DOM element
 */
export const useFocusFinders = () => {
  const tabster = useTabster();
  const { targetDocument } = useFluent();

  // Narrow props for now and let need dictate additional props in the future
  const findAllFocusable = React.useCallback(
    (container: HTMLElement, acceptCondition?: (el: HTMLElement) => boolean) =>
      tabster?.focusable.findAll({ container, acceptCondition }) || [],
    [tabster],
  );

  const findFirstFocusable = React.useCallback(
    (container: HTMLElement) => tabster?.focusable.findFirst({ container }),
    [tabster],
  );

  const findLastFocusable = React.useCallback(
    (container: HTMLElement) => tabster?.focusable.findLast({ container }),
    [tabster],
  );

  const findNextFocusable = React.useCallback(
    (currentElement: HTMLElement, options: Pick<Partial<TabsterTypes.FindNextProps>, 'container'> = {}) => {
      if (!tabster || !targetDocument) {
        return null;
      }

      const { container = targetDocument.body } = options;

      return tabster.focusable.findNext({ currentElement, container });
    },
    [tabster, targetDocument],
  );

  const findPrevFocusable = React.useCallback(
    (currentElement: HTMLElement, options: Pick<Partial<TabsterTypes.FindNextProps>, 'container'> = {}) => {
      if (!tabster || !targetDocument) {
        return null;
      }

      const { container = targetDocument.body } = options;

      return tabster.focusable.findPrev({ currentElement, container });
    },
    [tabster, targetDocument],
  );

  return {
    findAllFocusable,
    findFirstFocusable,
    findLastFocusable,
    findNextFocusable,
    findPrevFocusable,
  };
};
