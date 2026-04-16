'use client';

import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import * as React from 'react';

const useInsertionEffect = (React as never)['useInsertion' + 'Effect'] as typeof React.useLayoutEffect | undefined;
const useStyleInjectionEffect = useInsertionEffect ?? React.useLayoutEffect;

// Creates new stacking context to prevent z-index issues
// https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context
//
// Also keeps a portal on top of a page to prevent scrollbars from appearing
const PORTAL_MOUNT_NODE_STYLE_RULE = `[data-portal-node]{position:absolute;top:0;left:0;right:0;z-index:1000000}`;

// Tracks per-document <style> elements with reference counts to support multiple documents (e.g. iframes).
const documentStyleMap = new WeakMap<Document, { element: HTMLStyleElement; refCount: number }>();

function injectPortalMountNodeStyles(document: Document): void {
  const entry = documentStyleMap.get(document);
  if (entry) {
    entry.refCount++;
    return;
  }
  const style = document.createElement('style');
  style.textContent = PORTAL_MOUNT_NODE_STYLE_RULE;
  document.head.prepend(style);
  documentStyleMap.set(document, { element: style, refCount: 1 });
}

function ejectPortalMountNodeStyles(document: Document): void {
  const entry = documentStyleMap.get(document);
  if (!entry) {
    return;
  }
  entry.refCount--;
  if (entry.refCount === 0) {
    entry.element.remove();
    documentStyleMap.delete(document);
  }
}

/**
 * Injects a shared <style> element for portal mount node styling into the target document,
 * and returns the class name to apply to the mount node.
 *
 * The style element is reference-counted and removed when the last consumer unmounts.
 */
export function usePortalMountNodeStyles(disabled: boolean | undefined) {
  const { targetDocument } = useFluent();

  useStyleInjectionEffect(() => {
    if (disabled || !targetDocument) {
      return;
    }
    injectPortalMountNodeStyles(targetDocument);
    return () => ejectPortalMountNodeStyles(targetDocument);
  }, [disabled, targetDocument]);
}
