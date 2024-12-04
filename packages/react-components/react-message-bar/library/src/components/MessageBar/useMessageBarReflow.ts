import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { isHTMLElement } from '@fluentui/react-utilities';

export function useMessageBarReflow(enabled: boolean = false) {
  const { targetDocument } = useFluent();
  const forceUpdate = React.useReducer(() => ({}), {})[1];
  const reflowingRef = React.useRef(false);
  const prevInlineSizeRef = React.useRef(-1);

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

        if (!isFullyInViewport(target)) {
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

  const ref = React.useMemo(() => {
    let resizeObserver: ResizeObserver | null = null;
    return (el: HTMLElement | null) => {
      if (!enabled || !el || !targetDocument?.defaultView) {
        resizeObserver?.disconnect();
        return;
      }

      resizeObserver?.disconnect();

      const win = targetDocument.defaultView;
      resizeObserver = new win.ResizeObserver(handleResize);
      resizeObserver.observe(el, { box: 'border-box' });
      resizeObserver.observe(el.ownerDocument.body);
    };
  }, [targetDocument, handleResize, enabled]);

  return { ref, reflowing: reflowingRef.current };
}

const isFullyInViewport = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect();
  const doc = el.ownerDocument;
  const win = doc.defaultView;

  if (!win) {
    return true;
  }

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (win.innerHeight || doc.documentElement.clientHeight) &&
    rect.right <= (win.innerWidth || doc.documentElement.clientWidth)
  );
};
