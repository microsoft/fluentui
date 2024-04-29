import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { makeResetStyles } from '@griffel/react';
import { useCallback, useRef } from 'react';

// this style must be applied to the html element to disable scrolling
const useHTMLNoScrollStyles = makeResetStyles({
  overflowY: ['hidden', 'clip'],
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
  const originalpaddingRight = useRef<string>('');

  const disableBodyScroll = useCallback(() => {
    if (!targetDocument) {
      return;
    }

    const computedPaddingRight = getComputedPaddingRight(targetDocument);

    targetDocument.documentElement.classList.add(htmlNoScrollStyle);

    originalpaddingRight.current = targetDocument.body.style.paddingRight;
    targetDocument.body.style.paddingRight = computedPaddingRight;
  }, [targetDocument, htmlNoScrollStyle]);

  const enableBodyScroll = useCallback(() => {
    if (!targetDocument) {
      return;
    }

    targetDocument.documentElement.classList.remove(htmlNoScrollStyle);

    targetDocument.body.style.paddingRight = originalpaddingRight.current;
    originalpaddingRight.current = '';
  }, [targetDocument, htmlNoScrollStyle]);

  return {
    disableBodyScroll,
    enableBodyScroll,
  };
}

const getComputedPaddingRight = (targetDocument: Document) => {
  const { clientWidth: documentClientWidth } = targetDocument.documentElement;
  const { clientWidth: bodyClientWidth } = targetDocument.body;
  const innerWidth = targetDocument.defaultView?.innerWidth ?? 0;

  const bodyDocumentWidthOffset = documentClientWidth - bodyClientWidth;
  const verticalScrollbarGutter = `${innerWidth - documentClientWidth}px`;

  const { paddingRight: calculatedPaddingRight } = getComputedStyle(targetDocument.body);
  return `calc(${calculatedPaddingRight} + ${verticalScrollbarGutter} + ${bodyDocumentWidthOffset}px)`;
};
