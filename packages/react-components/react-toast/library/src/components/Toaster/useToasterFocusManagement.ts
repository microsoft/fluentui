import { isHTMLElement } from '@fluentui/react-utilities';
import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { ArrowDown, ArrowUp } from '@fluentui/keyboard-keys';
import { toastContainerClassNames } from '../ToastContainer';

const noop = () => undefined;

/**
 * @internal
 */
export function useToasterFocusManagement_unstable(pauseAllToasts: () => void, playAllToasts: () => void) {
  const { targetDocument } = useFluent();
  const cleanupListenersRef = React.useRef<() => void>(noop);

  return React.useCallback(
    (el: HTMLDivElement) => {
      if (!el || !targetDocument) {
        cleanupListenersRef.current();
        cleanupListenersRef.current = noop;
        return;
      }

      const toastContainerWalker = targetDocument.createTreeWalker(el, NodeFilter.SHOW_ELEMENT, {
        acceptNode(node: Node) {
          if (isHTMLElement(node) && node.classList.contains(toastContainerClassNames.root)) {
            return NodeFilter.FILTER_ACCEPT;
          }

          return NodeFilter.FILTER_SKIP;
        },
      });

      /**
       * FIXME: https://github.com/microsoft/tabster/issues/299
       * Toasts  should be arrow navigable and focus should be trapped in a stack of tasts
       * This is a temporary measure, Tabster does not have an API yet to enable mover arrow keys from within grouppers
       * Once tabster fully supports this use case, remove this hook
       */
      const keydownListener = (e: KeyboardEvent) => {
        const { target, key } = e;
        if (!isHTMLElement(target)) {
          return;
        }

        if (key === ArrowDown) {
          toastContainerWalker.currentNode = target;
          let nextToastContainer = toastContainerWalker.nextNode();
          if (!nextToastContainer) {
            toastContainerWalker.currentNode = el;
            nextToastContainer = toastContainerWalker.nextNode();
          }

          if (isHTMLElement(nextToastContainer)) {
            nextToastContainer.focus();
          }
        }

        if (key === ArrowUp) {
          toastContainerWalker.currentNode = target;
          let prevToastContainer = toastContainerWalker.previousNode();
          if (prevToastContainer && prevToastContainer.contains(target)) {
            prevToastContainer = toastContainerWalker.previousNode();
          }

          if (!prevToastContainer) {
            toastContainerWalker.currentNode = el;
            prevToastContainer = toastContainerWalker.lastChild();
          }

          if (isHTMLElement(prevToastContainer)) {
            prevToastContainer.focus();
          }
        }
      };

      const focusInListener = (e: FocusEvent) => {
        if (
          isHTMLElement(e.currentTarget) &&
          !e.currentTarget.contains(isHTMLElement(e.relatedTarget) ? e.relatedTarget : null)
        ) {
          pauseAllToasts();
        }
      };

      const focusOutListener = (e: FocusEvent) => {
        if (
          isHTMLElement(e.currentTarget) &&
          !e.currentTarget.contains(isHTMLElement(e.relatedTarget) ? e.relatedTarget : null)
        ) {
          playAllToasts();
        }
      };

      el.addEventListener('keydown', keydownListener);
      el.addEventListener('focusin', focusInListener);
      el.addEventListener('focusout', focusOutListener);

      cleanupListenersRef.current = () => {
        el.removeEventListener('keydown', keydownListener);
        el.removeEventListener('focusin', focusInListener);
        el.removeEventListener('focusout', focusOutListener);
      };
    },
    [targetDocument, pauseAllToasts, playAllToasts],
  );
}
