import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { useCallback, RefObject } from 'react';

const disableScrollElementProp = '__fluentDisableScrollElement' as const;
const offsetScrollbarElementProp = '__fluentOffsetScrollbarElement' as const;

type FluentDisableScrollElement = HTMLElement & {
  [disableScrollElementProp]: {
    count: number;
    previousOverflowStyle: string;
    previousPaddingRightStyle: string;
  };
};

type FluentOffsetScrollbarElement = HTMLElement & {
  [offsetScrollbarElementProp]: {
    count: number;
    right: string;
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
  const componentEl = componentRef.current!;
  const window = target.ownerDocument.defaultView;

  const { clientWidth } = target.ownerDocument.documentElement;
  const innerWidth = window?.innerWidth ?? 0;
  const browserSupportsClip = window && 'CSS' in window && 'supports' in CSS && CSS.supports('overflow', 'clip');
  assertIsDisableScrollElement(target);
  assertIsOffsetScrollbarElement(componentEl);
  if (target[disableScrollElementProp].count === 0) {
    target.style.overflow = browserSupportsClip ? 'clip' : 'hidden';
    const scrollbarGutter = `${innerWidth - clientWidth}px`;
    if (!browserSupportsClip) {
      target.style.paddingRight = scrollbarGutter;
    }
    componentEl.style.right = scrollbarGutter;
  }
  target[disableScrollElementProp].count++;
  componentEl[offsetScrollbarElementProp].count++;
  return () => {
    target[disableScrollElementProp].count--;
    componentEl[offsetScrollbarElementProp].count--;
    if (target[disableScrollElementProp].count === 0) {
      target.style.overflow = target[disableScrollElementProp].previousOverflowStyle;
      if (!browserSupportsClip) {
        target.style.paddingRight = target[disableScrollElementProp].previousPaddingRightStyle;
      }
    }
    if (componentEl[offsetScrollbarElementProp].count === 0) {
      componentEl.style.right = componentEl[offsetScrollbarElementProp].right;
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

function assertIsOffsetScrollbarElement(element: HTMLElement): asserts element is FluentOffsetScrollbarElement {
  (element as FluentOffsetScrollbarElement)[offsetScrollbarElementProp] ??= {
    count: 0,
    right: element.style.right,
  };
}
