import { isHTMLElement } from '@fluentui/react-utilities';
import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { ArrowDown, ArrowUp } from '@fluentui/keyboard-keys';
import { toastContainerClassNames } from '../ToastContainer';

/**
 * @internal
 * Toasts  should be arrow navigable and focus should be trapped in a stack of tasts
 * This is a temporary measure, Tabster does not have an API yet to enable mover arrow keys from within grouppers
 * Once tabster fully supports this use case, remove this hook
 */
export function useFocusManagement_unstable() {
  const { targetDocument } = useFluent();
  return React.useCallback(
    (el: HTMLDivElement | null) => {
      if (!el || !targetDocument) {
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

      el.addEventListener('keydown', e => {
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
      });
    },
    [targetDocument],
  );
}
