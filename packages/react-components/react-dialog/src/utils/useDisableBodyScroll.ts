import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { makeResetStyles } from '@griffel/react';
import { useCallback, useRef } from 'react';
import { DialogScrollbarOffsetStrategy } from '../components/Dialog/Dialog.types';

// this style must be applied to the html element to disable scrolling
const useHTMLNoScrollStyles = makeResetStyles({
  overflowY: ['hidden', 'clip'],
});
const useScrollbarGutterStyles = makeResetStyles({
  scrollbarGutter: 'stable',
});

/**
 * hook that disables body scrolling through `overflowY: hidden` CSS property
 */
export function useDisableBodyScroll(): {
  disableBodyScroll: (scrollbarHideOffset?: { strategy: DialogScrollbarOffsetStrategy } | string) => void;
  enableBodyScroll: () => void;
} {
  const htmlNoScrollStyle = useHTMLNoScrollStyles();
  const scrollbarGutterStyle = useScrollbarGutterStyles();
  const { targetDocument } = useFluent_unstable();
  const originalpaddingRight = useRef<string | null>(null);

  const disableBodyScroll = useCallback(
    (scrollbarHideOffset: { strategy: DialogScrollbarOffsetStrategy } | string = { strategy: 'scrollbar-gutter' }) => {
      if (!targetDocument) {
        return;
      }

      const scrollbarOffset = getScrollbarOffsetPaddingRight(targetDocument, scrollbarHideOffset);

      targetDocument.documentElement.classList.add(htmlNoScrollStyle);

      if (scrollbarOffset.setType === 'padding') {
        originalpaddingRight.current = targetDocument.body.style.paddingRight;
        targetDocument.body.style.paddingRight = scrollbarOffset.paddingRight;
      } else if (scrollbarOffset.setType === 'scrollbar-gutter') {
        originalpaddingRight.current = null;
        targetDocument.documentElement.classList.add(scrollbarGutterStyle);
      }
    },
    [targetDocument, htmlNoScrollStyle, scrollbarGutterStyle],
  );

  const enableBodyScroll = useCallback(() => {
    if (!targetDocument) {
      return;
    }

    targetDocument.documentElement.classList.remove(htmlNoScrollStyle);
    targetDocument.documentElement.classList.remove(scrollbarGutterStyle);

    if (originalpaddingRight.current !== null) {
      targetDocument.body.style.paddingRight = originalpaddingRight.current;
    }

    originalpaddingRight.current = null;
  }, [targetDocument, htmlNoScrollStyle, scrollbarGutterStyle]);

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

type ScrollbarOffset = { setType: 'scrollbar-gutter' } | { setType: 'padding'; paddingRight: string };

const getScrollbarOffsetPaddingRight = (
  targetDocument: Document,
  scrollbarHideOffset: { strategy: DialogScrollbarOffsetStrategy } | string,
): ScrollbarOffset => {
  if (typeof scrollbarHideOffset === 'string') {
    return { setType: 'padding', paddingRight: scrollbarHideOffset };
  }

  const _window = targetDocument.defaultView;
  const supportsScrollbarGutter =
    _window?.CSS && 'supports' in _window.CSS && _window.CSS.supports('scrollbar-gutter', 'stable');

  if (scrollbarHideOffset?.strategy === 'scrollbar-gutter' && supportsScrollbarGutter) {
    return { setType: 'scrollbar-gutter' };
  }

  return { setType: 'padding', paddingRight: getComputedPaddingRight(targetDocument) };
};
