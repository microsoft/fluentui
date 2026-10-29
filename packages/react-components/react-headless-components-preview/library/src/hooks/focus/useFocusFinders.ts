'use client';

import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import {
  findAllFocusable,
  findFirstFocusable,
  findLastFocusable,
  findNextFocusable,
  findPrevFocusable,
} from './focusFinders';
import type { FocusableAcceptCondition } from './focusFinders';

export type FocusFinders = {
  findAllFocusable: (container: HTMLElement | null, acceptCondition?: FocusableAcceptCondition) => HTMLElement[];
  findFirstFocusable: (container: HTMLElement | null) => HTMLElement | null;
  findLastFocusable: (container: HTMLElement | null) => HTMLElement | null;
  findNextFocusable: (currentElement: HTMLElement | null, options?: { container?: HTMLElement }) => HTMLElement | null;
  findPrevFocusable: (currentElement: HTMLElement | null, options?: { container?: HTMLElement }) => HTMLElement | null;
};

/**
 * Returns helpers that traverse the focusable elements of a container in DOM order.
 */
export const useFocusFinders = (): FocusFinders => {
  const { targetDocument } = useFluent();

  return React.useMemo(() => {
    const resolveContainer = (options?: { container?: HTMLElement }) => options?.container ?? targetDocument?.body;

    return {
      findAllFocusable: (container, acceptCondition) => (container ? findAllFocusable(container, acceptCondition) : []),
      findFirstFocusable: container => (container ? findFirstFocusable(container) : null),
      findLastFocusable: container => (container ? findLastFocusable(container) : null),
      findNextFocusable: (currentElement, options) => {
        const container = resolveContainer(options);
        return currentElement && container ? findNextFocusable(currentElement, { container }) : null;
      },
      findPrevFocusable: (currentElement, options) => {
        const container = resolveContainer(options);
        return currentElement && container ? findPrevFocusable(currentElement, { container }) : null;
      },
    };
  }, [targetDocument]);
};
