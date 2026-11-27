'use client';

import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { isHTMLElement, useAnimationFrame } from '@fluentui/react-utilities';

export function useMessageBarReflow(enabled: boolean = false): {
  ref: React.RefCallback<HTMLElement>;
  reflowing: boolean;
} {
  const { targetDocument } = useFluent();
  const forceUpdate = React.useReducer(() => ({}), {})[1];
  const reflowingRef = React.useRef(false);
  const [requestAnimationFrame, cancelAnimationFrame] = useAnimationFrame();
  // TODO: exclude types from this lint rule: https://github.com/microsoft/fluentui/issues/31286

  const resizeObserverRef = React.useRef<ResizeObserver | null>(null);
  const observedElementRef = React.useRef<HTMLElement | null>(null);
  const singleLineWidthRef = React.useRef(Number.POSITIVE_INFINITY);

  const handleResize: ResizeObserverCallback = React.useCallback(
    entries => {
      // Resize observer is only owned by this component - one resize observer entry expected
      // No need to support multiple fragments - one border box entry expected
      if (process.env.NODE_ENV !== 'production' && entries.length > 1) {
        // eslint-disable-next-line no-console
        console.error(
          [
            'useMessageBarReflow: Resize observer should only have one entry. ',
            'If multiple entries are observed, the first entry will be used.',
            'This is a bug, please report it to the Fluent UI team.',
          ].join(' '),
        );
      }

      const entry = entries[0];
      // `borderBoxSize` is not supported before Chrome 84, Firefox 92, nor Safari 15.4
      const inlineSize = entry?.borderBoxSize?.[0]?.inlineSize ?? entry?.target.getBoundingClientRect().width;

      if (inlineSize === undefined || !entry) {
        return;
      }

      const { target } = entry;

      if (!isHTMLElement(target)) {
        return;
      }

      let nextReflowing: boolean | undefined;

      if (reflowingRef.current) {
        if (inlineSize >= singleLineWidthRef.current) {
          nextReflowing = false;
        }
      } else {
        const scrollWidth = target.scrollWidth;
        if (inlineSize < scrollWidth) {
          nextReflowing = true;
          singleLineWidthRef.current = scrollWidth;
        }
      }

      if (typeof nextReflowing !== 'undefined' && reflowingRef.current !== nextReflowing) {
        reflowingRef.current = nextReflowing;
        // Changing layout during observer delivery resizes the observed root and can trigger a loop error.
        requestAnimationFrame(() => forceUpdate());
      }
    },
    [forceUpdate, requestAnimationFrame],
  );

  const ref = React.useCallback(
    (el: HTMLElement | null) => {
      resizeObserverRef.current?.disconnect();
      cancelAnimationFrame();
      observedElementRef.current = el;
      if (el) {
        resizeObserverRef.current?.observe(el, { box: 'border-box' });
      }
    },
    [cancelAnimationFrame],
  );

  React.useEffect(() => {
    if (!enabled || !targetDocument?.defaultView) {
      return;
    }

    const resizeObserver = new targetDocument.defaultView.ResizeObserver(handleResize);
    resizeObserverRef.current = resizeObserver;
    if (observedElementRef.current) {
      resizeObserver.observe(observedElementRef.current, { box: 'border-box' });
    }

    return () => {
      resizeObserver.disconnect();
      resizeObserverRef.current = null;
      cancelAnimationFrame();
    };
  }, [enabled, targetDocument, handleResize, cancelAnimationFrame]);

  // eslint-disable-next-line react-hooks/refs
  return { ref, reflowing: reflowingRef.current };
}
