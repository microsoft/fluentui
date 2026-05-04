'use client';

import * as React from 'react';
import { Tab } from '@fluentui/keyboard-keys';
import { useTimeout } from '@fluentui/react-utilities';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { cycleTabFocus } from './cycleTabFocus';
import { findFocusable, findTabbable, isFocusable } from './utils';

/**
 * Traps keyboard focus within the element the returned ref is attached to.
 *
 * When the trap activates, focus is moved to the first element matching
 * `[data-autofocus]`, falling back to the first tabbable descendant, then any
 * focusable descendant, and finally the trap node itself. While the trap is
 * active, Tab and Shift+Tab cycle focus between the first and last tabbable
 * descendants.
 *
 * @param active - whether the trap is enabled. Defaults to `true`.
 * @returns a ref callback to attach to the element that should hold focus.
 */
export function useFocusTrap(active = true): React.RefCallback<HTMLElement | null> {
  const ref = React.useRef<HTMLElement>(null);
  const [setTimeout, clearTimeout] = useTimeout();
  const { targetDocument } = useFluent_unstable();

  const focusNode = (node: HTMLElement) => {
    const focusElement =
      node.querySelector<HTMLElement>('[data-autofocus]') ??
      findTabbable(node) ??
      findFocusable(node) ??
      (isFocusable(node) ? node : null);

    if (focusElement) {
      focusElement.focus({ preventScroll: true });
    } else if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn('[useFocusTrap] Failed to find focusable element within provided node', node);
    }
  };

  const setRef = React.useCallback(
    (node: HTMLElement | null) => {
      if (!active) {
        return;
      }

      if (node === null) {
        clearTimeout();
        ref.current = null;
        return;
      }

      if (ref.current === node) {
        return;
      }

      ref.current = node;

      setTimeout(() => {
        if (node.getRootNode()) {
          focusNode(node);
        } else if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.warn('[useFocusTrap] Ref node is not part of the dom', node);
        }
      });
    },
    [active, setTimeout, clearTimeout],
  );

  React.useEffect(() => {
    if (!active) {
      return undefined;
    }

    if (ref.current) {
      setTimeout(() => {
        if (ref.current) {
          focusNode(ref.current);
        }
      });
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === Tab && ref.current) {
        cycleTabFocus(ref.current, event);
      }
    };

    targetDocument?.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout();
      targetDocument?.removeEventListener('keydown', handleKeyDown);
    };
  }, [active, setTimeout, clearTimeout, targetDocument]);

  return setRef;
}
