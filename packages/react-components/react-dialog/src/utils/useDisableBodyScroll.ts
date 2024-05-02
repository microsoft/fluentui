import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { makeResetStyles } from '@griffel/react';
import { useCallback } from 'react';

// this style must be applied to the html element to disable scrolling
const useHTMLNoScrollStyles = makeResetStyles({
  overflowY: ['hidden', 'clip'],
  scrollbarGutter: 'stable',
});

/**
 * hook that disables body scrolling through `overflowY: hidden` CSS property
 */
export function useDisableBodyScroll(): {
  disableBodyScroll: () => void;
  enableBodyScroll: () => void;
} {
  const htmlNoScrollStyle = useHTMLNoScrollStyles();
  const { targetDocument } = useFluent_unstable();

  const disableBodyScroll = useCallback(() => {
    if (!targetDocument) {
      return;
    }
    const isScrollbarVisible =
      (targetDocument.defaultView?.innerWidth ?? 0) > targetDocument.documentElement.clientWidth;
    if (!isScrollbarVisible) {
      return;
    }
    targetDocument.documentElement.classList.add(htmlNoScrollStyle);
    return;
  }, [targetDocument, htmlNoScrollStyle]);

  const enableBodyScroll = useCallback(() => {
    if (!targetDocument) {
      return;
    }
    targetDocument.documentElement.classList.remove(htmlNoScrollStyle);
  }, [targetDocument, htmlNoScrollStyle]);

  return {
    disableBodyScroll,
    enableBodyScroll,
  };
}
