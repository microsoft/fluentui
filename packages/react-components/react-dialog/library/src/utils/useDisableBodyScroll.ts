import * as React from 'react';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';

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

  const disableBodyScroll = React.useCallback(() => {
    if (!targetDocument) {
      return;
    }
    const isHorizontalScrollbarVisible =
      // When the window is a fractional height, `innerHeight` always rounds down but `clientHeight` rounds either up or down depending on the value.
      // To properly compare the body clientHeight to the window innerHeight, manually round down the fractional value to match innerHeight's calculation.
      Math.floor(targetDocument.body.getBoundingClientRect().height) > (targetDocument.defaultView?.innerHeight ?? 0);
    if (!isHorizontalScrollbarVisible) {
      return;
    }
    targetDocument.documentElement.classList.add(htmlNoScrollStyles);
    targetDocument.body.classList.add(bodyNoScrollStyles);
    return;
  }, [targetDocument, htmlNoScrollStyles, bodyNoScrollStyles]);

  const enableBodyScroll = React.useCallback(() => {
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
