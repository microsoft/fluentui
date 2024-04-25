import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { useCallback, RefObject } from 'react';

const disableScrollElementProp = '__fluentDisableScrollElement' as const;
const offsetScrollbarElementProp = '__fluentOffsetScrollbarElement' as const;

type FluentDisableScrollElement = HTMLElement & {
  [disableScrollElementProp]: {
    count: number;
    previousOverflowStyle: string;
    previousPaddingRightStyle: string;
    computedPaddingRight: string;
  };
};

type FluentOffsetScrollbarElement = HTMLElement & {
  [offsetScrollbarElementProp]: {
    count: number;
    previousRightStyle: string;
    previousBottomStyle: string;
  };
};

/**
 * hook that disables body scrolling through `overflow: hidden` CSS property
 */
export function useDisableBodyScroll(componentRef: RefObject<HTMLElement>) {
  const { targetDocument } = useFluent_unstable();
  return useCallback(() => {
    if (targetDocument) {
      return disableScroll(targetDocument.body, componentRef);
    }
  }, [targetDocument, componentRef]);
}

/**
 * disables scrolling from a given element through `overflow: hidden` CSS property
 * @param target - element to disable scrolling from
 * @returns a method for enabling scrolling again
 */
export function disableScroll(target: HTMLElement, componentRef: RefObject<HTMLElement>) {
  const componentEl = componentRef.current;
  const window = target.ownerDocument.defaultView;

  const { clientWidth, clientHeight } = target.ownerDocument.documentElement;
  const innerWidth = window?.innerWidth ?? 0;
  const innerHeight = window?.innerHeight ?? 0;
  const browserSupportsClip = window && 'CSS' in window && 'supports' in CSS && CSS.supports('overflow', 'clip');
  const verticalScrollbarGutter = `${innerWidth - clientWidth}px`;
  const horizontalScrollbarGutter = `${innerHeight - clientHeight}px`;

  assertIsDisableScrollElement(target);
  if (target[disableScrollElementProp].count === 0) {
    const computedPaddingRight = getComputedStyle(target).paddingRight;
    target.style.overflow = browserSupportsClip ? 'clip' : 'hidden';
    target.style.paddingRight = `calc(${computedPaddingRight} + ${verticalScrollbarGutter})`;
  }
  target[disableScrollElementProp].count++;

  if (componentEl) {
    assertIsOffsetScrollbarElement(componentEl);
    if (componentEl[offsetScrollbarElementProp].count === 0) {
      componentEl.style.right = verticalScrollbarGutter;
      componentEl.style.bottom = horizontalScrollbarGutter;
    }
    componentEl[offsetScrollbarElementProp].count++;
  }
  return () => {
    target[disableScrollElementProp].count--;
    if (target[disableScrollElementProp].count === 0) {
      target.style.overflow = target[disableScrollElementProp].previousOverflowStyle;
      target.style.paddingRight = target[disableScrollElementProp].previousPaddingRightStyle;
    }

    if (componentEl) {
      componentEl[offsetScrollbarElementProp].count--;
      if (componentEl[offsetScrollbarElementProp].count === 0) {
        componentEl.style.right = componentEl[offsetScrollbarElementProp].previousRightStyle;
        componentEl.style.bottom = componentEl[offsetScrollbarElementProp].previousBottomStyle;
      }
    }
  };
}

function assertIsDisableScrollElement(element: HTMLElement): asserts element is FluentDisableScrollElement {
  (element as FluentDisableScrollElement)[disableScrollElementProp] ??= {
    count: 0,
    previousOverflowStyle: element.style.overflow,
    previousPaddingRightStyle: element.style.paddingRight,
    computedPaddingRight: getComputedStyle(element).paddingRight,
  };
}

function assertIsOffsetScrollbarElement(element: HTMLElement): asserts element is FluentOffsetScrollbarElement {
  (element as FluentOffsetScrollbarElement)[offsetScrollbarElementProp] ??= {
    count: 0,
    previousRightStyle: element.style.right,
    previousBottomStyle: element.style.bottom,
  };
}
