import * as React from 'react';
import { Announce } from '../AriaLive';
import { isHTMLElement } from '@fluentui/react-utilities';

/**
 * Wraps an aria live announcement function.
 * Aria live announcements can be detrimental once the user is already navigating
 * multiple toasts. Once the user is focused inside the toaster, the announecments should be disabled.
 * @param announce
 * @returns A function to announce a toast and a ref to attach to the toaster element
 */
export function useToastAnnounce(announce: Announce) {
  const activeRef = React.useRef(true);
  const cleanupRef = React.useRef<() => void>(() => undefined);
  const announceToast = React.useCallback<Announce>(
    (message, options) => {
      if (activeRef.current) {
        announce(message, options);
      }
    },
    [announce],
  );

  const toasterRef = React.useCallback((el: HTMLDivElement | null) => {
    if (!el) {
      cleanupRef.current();
      return;
    }

    const onFocusIn = (e: FocusEvent) => {
      if (
        isHTMLElement(e.currentTarget) &&
        e.currentTarget.contains(isHTMLElement(e.relatedTarget) ? e.relatedTarget : null)
      ) {
        return;
      }

      activeRef.current = false;
    };

    const onFocusOut = (e: FocusEvent) => {
      if (
        isHTMLElement(e.currentTarget) &&
        e.currentTarget.contains(isHTMLElement(e.relatedTarget) ? e.relatedTarget : null)
      ) {
        return;
      }

      activeRef.current = true;
    };

    el.addEventListener('focusin', onFocusIn);
    el.addEventListener('focusout', onFocusOut);

    cleanupRef.current = () => {
      el.removeEventListener('focusin', onFocusIn);
      el.removeEventListener('focusout', onFocusOut);
    };
  }, []);

  return {
    announceToast,
    toasterRef,
  };
}
