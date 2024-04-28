import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { makeResetStyles } from '@griffel/react';
import { useCallback, useRef } from 'react';
import { DialogScrollbarHideStrategy } from '../components/Dialog/Dialog.types';

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
  disableBodyScroll: (scrollbarHideOffset?: { strategy: DialogScrollbarHideStrategy } | string) => void;
  enableBodyScroll: () => void;
} {
  const htmlNoScrollStyle = useHTMLNoScrollStyles();
  const scrollbarGutterStyle = useScrollbarGutterStyles();
  const { targetDocument } = useFluent_unstable();
  const originalpaddingRight = useRef<string | null>(null);

  const disableBodyScroll = useCallback(
    (scrollbarHideOffset: { strategy: DialogScrollbarHideStrategy } | string = { strategy: 'scrollbar-gutter' }) => {
      if (!targetDocument) {
        originalpaddingRight.current = null;
        return;
      }

      const _window = targetDocument.defaultView;

      const isStaticWidthOffset = typeof scrollbarHideOffset === 'string';

      const supportsScrollbarGutter =
        _window?.CSS && 'supports' in _window.CSS && _window.CSS.supports('scrollbar-gutter', 'stable');

      const getComputedPaddingRight = () => {
        const { clientWidth: documentClientWidth } = targetDocument.documentElement;
        const { clientWidth: bodyClientWidth } = targetDocument.body;
        const innerWidth = _window?.innerWidth ?? 0;

        const bodyDocumentWidthOffset = documentClientWidth - bodyClientWidth;
        const verticalScrollbarGutter = `${innerWidth - documentClientWidth}px`;

        const { paddingRight: calculatedPaddingRight } = getComputedStyle(targetDocument.body);
        return `calc(${calculatedPaddingRight} + ${verticalScrollbarGutter} + ${bodyDocumentWidthOffset}px)`;
      };

      let paddingRight = isStaticWidthOffset ? scrollbarHideOffset : null;
      if (!isStaticWidthOffset && (scrollbarHideOffset?.strategy === 'getComputedStyles' || !supportsScrollbarGutter)) {
        paddingRight = getComputedPaddingRight();
      }

      targetDocument.documentElement.classList.add(htmlNoScrollStyle);
      if (paddingRight) {
        originalpaddingRight.current = targetDocument.body.style.paddingRight;
        targetDocument.body.style.paddingRight = paddingRight;
      } else {
        originalpaddingRight.current = null;
        targetDocument.documentElement.classList.add(scrollbarGutterStyle);
      }
      return;
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
