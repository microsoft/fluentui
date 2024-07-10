import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { isHTMLElement, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';

export function useMessageBarReflow(enabled: boolean = false) {
  const { targetDocument } = useFluent();
  const forceUpdate = React.useReducer(() => ({}), {})[1];
  const reflowingRef = React.useRef(false);
  // TODO: exclude types from this lint rule: https://github.com/microsoft/fluentui/issues/31286
  // eslint-disable-next-line no-restricted-globals
  const resizeObserverRef = React.useRef<ResizeObserver | null>(null);
  const prevInlineSizeRef = React.useRef(-1);
  const targetRef = React.useRef<HTMLElement>(null);

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
      const borderBoxSize = entry?.borderBoxSize[0];
      if (!borderBoxSize || !entry) {
        return;
      }

      const { inlineSize } = borderBoxSize;
      const { target } = entry;

      if (!isHTMLElement(target)) {
        return;
      }

      let nextReflowing: boolean | undefined;

      // No easy way to really determine when the single line layout will fit
      // Just keep try to set single line layout as long as the size is growing
      // Will cause flickering when size is being adjusted gradually (i.e. drag) - but this should not be a common case
      if (reflowingRef.current) {
        if (prevInlineSizeRef.current < inlineSize) {
          nextReflowing = false;
        }
      } else {
        const scrollWidth = target.scrollWidth;
        if (inlineSize < scrollWidth) {
          nextReflowing = true;
        }
      }

      prevInlineSizeRef.current = inlineSize;
      if (typeof nextReflowing !== 'undefined' && reflowingRef.current !== nextReflowing) {
        reflowingRef.current = nextReflowing;
        forceUpdate();
      }
    },
    [forceUpdate],
  );

  useIsomorphicLayoutEffect(() => {
    const cleanUp = () => {
      resizeObserverRef.current?.disconnect();
    };
    if (!enabled || !targetRef.current || !targetDocument?.defaultView) {
      return cleanUp;
    }

    const win = targetDocument.defaultView;
    const resizeObserver = new win.ResizeObserver(handleResize);
    resizeObserverRef.current = resizeObserver;
    resizeObserver.observe(targetRef.current, { box: 'border-box' });
    return cleanUp;
  }, [enabled, handleResize, targetDocument]);

  return { ref: targetRef, reflowing: reflowingRef.current };
}
