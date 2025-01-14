import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';

export function useMessageBarReflow(enabled: boolean = false) {
  const { targetDocument } = useFluent();
  const prevInlineSizeRef = React.useRef(-1);
  const messageBarRef = React.useRef<HTMLElement | null>(null);

  const [reflowing, setReflowing] = React.useState(false);

  // This layout effect 'sanity checks' what observers have done
  // since DOM has not been flushed when observers run
  useIsomorphicLayoutEffect(() => {
    if (!messageBarRef.current) {
      return;
    }

    setReflowing(prevReflowing => {
      if (!prevReflowing && messageBarRef.current && isReflowing(messageBarRef.current)) {
        return true;
      }

      return prevReflowing;
    });
  }, [reflowing]);

  const handleResize: ResizeObserverCallback = React.useCallback(() => {
    if (!messageBarRef.current) {
      return;
    }

    const inlineSize = messageBarRef.current.getBoundingClientRect().width;
    const scrollWidth = messageBarRef.current.scrollWidth;

    const expanding = prevInlineSizeRef.current < inlineSize;
    const overflowing = inlineSize < scrollWidth;

    setReflowing(!expanding || overflowing);
  }, []);

  const handleIntersection: IntersectionObserverCallback = React.useCallback(entries => {
    if (entries[0].intersectionRatio < 1) {
      setReflowing(true);
    }
  }, []);

  const ref = React.useMemo(() => {
    let resizeObserver: ResizeObserver | null = null;
    let intersectionObserer: IntersectionObserver | null = null;

    return (el: HTMLElement | null) => {
      if (!enabled || !el || !targetDocument?.defaultView) {
        resizeObserver?.disconnect();
        intersectionObserer?.disconnect();
        return;
      }

      messageBarRef.current = el;

      const win = targetDocument.defaultView;
      resizeObserver = new win.ResizeObserver(handleResize);
      intersectionObserer = new win.IntersectionObserver(handleIntersection, { threshold: 1 });

      intersectionObserer.observe(el);
      resizeObserver.observe(el, { box: 'border-box' });
    };
  }, [handleResize, handleIntersection, enabled, targetDocument]);

  return { ref, reflowing };
}

const isReflowing = (el: HTMLElement) => {
  return el.scrollWidth > el.offsetWidth || !isFullyInViewport(el);
};

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
