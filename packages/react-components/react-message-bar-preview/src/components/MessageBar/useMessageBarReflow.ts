import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { isHTMLElement } from '@fluentui/react-utilities';

export function useMessageBarReflow(enabled: boolean = false) {
  const { targetDocument } = useFluent();
  const forceUpdate = React.useReducer(() => ({}), {})[1];
  const reflowingRef = React.useRef(false);
  const resizeObserverRef = React.useRef<ResizeObserver | null>(null);
  const prevInlineSizeRef = React.useRef(-1);

  const handleResize: ResizeObserverCallback = React.useCallback(
    entries => {
      // Resize observer is only owned by this component - one resize observer entry expected
      // No need to support mutliple fragments -  one border box entry expected
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

      let nextReflowing = reflowingRef.current;

      if (!reflowingRef.current) {
        const scrollWidth = target.scrollWidth;
        if (inlineSize < scrollWidth) {
          nextReflowing = true;
        }
      }

      // No easy way to really determine when the single line layout will fit
      // Just keep try to set single line layout as long as the size is growing
      // Will cause flickering when size is being adjusted gradually (i.e drag) - but this should not be a common case
      if (reflowingRef.current) {
        if (prevInlineSizeRef.current < inlineSize) {
          nextReflowing = false;
        }
      }

      if (reflowingRef.current !== nextReflowing) {
        reflowingRef.current = nextReflowing;
        forceUpdate();
      }

      prevInlineSizeRef.current = inlineSize;
    },
    [forceUpdate],
  );

  const ref = React.useCallback(
    (el: HTMLElement | null) => {
      if (!enabled || !el || !targetDocument?.defaultView) {
        return;
      }

      const win = targetDocument.defaultView;
      const resizeObserver = new win.ResizeObserver(handleResize);
      resizeObserverRef.current = resizeObserver;
      resizeObserver.observe(el, { box: 'border-box' });
    },
    [targetDocument, handleResize, enabled],
  );

  return { ref, reflowing: reflowingRef.current };
}
