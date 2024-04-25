import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { useCallback } from 'react';

const disableScrollElementProp = '__fluentDisableScrollElement' as const;

type FluentDisableScrollElement = HTMLElement & {
  [disableScrollElementProp]: {
    count: number;
    previousOverflowStyle: string;
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
  const window = target.ownerDocument.defaultView;
  const browserSupportsClip = window?.CSS && 'supports' in window.CSS && window.CSS.supports('overflow', 'clip');

  assertIsDisableScrollElement(target);
  if (target[disableScrollElementProp].count === 0) {
    target.style.overflow = browserSupportsClip ? 'clip' : 'hidden';
  }
  target[disableScrollElementProp].count++;
  return () => {
    target[disableScrollElementProp].count--;
    if (target[disableScrollElementProp].count === 0) {
      target.style.overflow = target[disableScrollElementProp].previousOverflowStyle;
    }
  };
}

function assertIsDisableScrollElement(element: HTMLElement): asserts element is FluentDisableScrollElement {
  (element as FluentDisableScrollElement)[disableScrollElementProp] ??= {
    count: 0,
    previousOverflowStyle: element.style.overflow,
  };
}
