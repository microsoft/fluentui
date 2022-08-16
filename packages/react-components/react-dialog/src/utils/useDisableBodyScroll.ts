import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import * as React from 'react';

/**
 * Hook that provides methods for enabling and disabling body scrolling through `overflow:hidden` method
 */
export function useDisableBodyScroll() {
  const overflowSettingRef = React.useRef<string>();
  const paddingRightRef = React.useRef<string>();
  const { targetDocument } = useFluent_unstable();

  const setOverflowHidden = React.useCallback(() => {
    if (!targetDocument || !targetDocument.defaultView) {
      return;
    }
    if (paddingRightRef.current === undefined) {
      const paddingRight = computeScrollBarSizeAndPadding(targetDocument, targetDocument.defaultView);
      if (paddingRight) {
        paddingRightRef.current = targetDocument.body.style.paddingRight;
        targetDocument.body.style.paddingRight = `${paddingRight}px`;
      }
    }
    if (overflowSettingRef.current === undefined) {
      overflowSettingRef.current = targetDocument.body.style.overflow;
      targetDocument.body.style.overflow = 'hidden';
    }
  }, [targetDocument]);

  const restoreOverflowSetting = React.useCallback(() => {
    if (!targetDocument) {
      return;
    }
    if (paddingRightRef.current !== undefined) {
      targetDocument.body.style.paddingRight = paddingRightRef.current;
      paddingRightRef.current = undefined;
    }

    if (overflowSettingRef.current !== undefined) {
      targetDocument.body.style.overflow = overflowSettingRef.current;
      overflowSettingRef.current = undefined;
    }
  }, [targetDocument]);
  return { disableBodyScroll: setOverflowHidden, enableBodyScroll: restoreOverflowSetting };
}

function computeScrollBarSizeAndPadding(document: Document, view: Window) {
  const scrollBarSize = view.innerWidth - document.documentElement.clientWidth;

  if (scrollBarSize > 0) {
    const computedBodyPaddingRight = parseInt(
      view.getComputedStyle(document.body).getPropertyValue('padding-right'),
      10,
    );
    return computedBodyPaddingRight + scrollBarSize;
  }
}
