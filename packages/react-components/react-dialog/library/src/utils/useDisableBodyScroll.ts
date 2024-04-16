import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { useCallback } from 'react';

const disableScrollElementProp = '__fluentDisableScrollElement' as const;

type FluentDisableScrollElement = HTMLElement & {
  [disableScrollElementProp]: {
    count: number;
    previousOverflowStyle: string;
    previousPaddingRightStyle: string;
  };
};

/**
 * hook that disables body scrolling through `overflow: hidden` CSS property
 */
export function useDisableBodyScroll() {
  const { targetDocument } = useFluent_unstable();
  return useCallback(() => {
    if (targetDocument) {
      return disableScroll(targetDocument.body);
    }
  }, [targetDocument]);
}

/**
 * disables scrolling from a given element through `overflow: hidden` CSS property
 * @param target - element to disable scrolling from
 * @returns a method for enabling scrolling again
 */
export function disableScroll(target: HTMLElement) {
  const { clientWidth } = target.ownerDocument.documentElement;
  const innerWidth = target.ownerDocument.defaultView?.innerWidth ?? 0;
  assertIsDisableScrollElement(target);
  if (target[disableScrollElementProp].count === 0) {
    target.style.overflow = 'hidden';
    target.style.paddingRight = `${innerWidth - clientWidth}px`;
  }
  target[disableScrollElementProp].count++;
  return () => {
    target[disableScrollElementProp].count--;
    if (target[disableScrollElementProp].count === 0) {
      target.style.overflow = target[disableScrollElementProp].previousOverflowStyle;
      target.style.paddingRight = target[disableScrollElementProp].previousPaddingRightStyle;
    }
  };
}

function assertIsDisableScrollElement(element: HTMLElement): asserts element is FluentDisableScrollElement {
  (element as FluentDisableScrollElement)[disableScrollElementProp] ??= {
    count: 0,
    previousOverflowStyle: element.style.overflow,
    previousPaddingRightStyle: element.style.paddingRight,
  };
}
