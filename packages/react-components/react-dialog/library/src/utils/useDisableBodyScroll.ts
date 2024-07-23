import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { useCallback } from 'react';

import { useBodyNoScrollStyles, useHTMLNoScrollStyles } from './useDisableBodyScroll.styles';

/**
 * @internal
 * A React *hook* that disables body scrolling through `overflowY: hidden` CSS property
 */
export function useDisableBodyScroll(): {
  disableBodyScroll: () => void;
  enableBodyScroll: () => void;
} {
  const htmlNoScrollStyles = useHTMLNoScrollStyles();
  const bodyNoScrollStyles = useBodyNoScrollStyles();
  const { targetDocument } = useFluent_unstable();

  const disableBodyScroll = useCallback(() => {
    if (!targetDocument) {
      return;
    }
    const isHorizontalScrollbarVisible =
      targetDocument.body.clientHeight > (targetDocument.defaultView?.innerHeight ?? 0);
    if (!isHorizontalScrollbarVisible) {
      return;
    }
    targetDocument.documentElement.classList.add(htmlNoScrollStyles);
    targetDocument.body.classList.add(bodyNoScrollStyles);
    return;
  }, [targetDocument, htmlNoScrollStyles, bodyNoScrollStyles]);

  const enableBodyScroll = useCallback(() => {
    if (!targetDocument) {
      return;
    }
    targetDocument.documentElement.classList.remove(htmlNoScrollStyles);
    targetDocument.body.classList.remove(bodyNoScrollStyles);
  }, [targetDocument, htmlNoScrollStyles, bodyNoScrollStyles]);

  return {
    disableBodyScroll,
    enableBodyScroll,
  };
}
