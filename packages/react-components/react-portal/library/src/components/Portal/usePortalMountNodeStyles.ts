'use client';

import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import * as React from 'react';

const useInsertionEffect = (React as never)['useInsertion' + 'Effect'] as typeof React.useLayoutEffect | undefined;

// Creates new stacking context to prevent z-index issues
// https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context
//
// Also keeps a portal on top of a page to prevent scrollbars from appearing
const PORTAL_MOUNT_NODE_STYLE_RULE = `[data-portal-node]{position:absolute;top:0;left:0;right:0;z-index:1000000}`;

// Attribute used to identify the injected portal mount node <style> element in a document.
// Storing the element itself in the WeakMap would create a cross-reference
// (Document → HTMLStyleElement → Document via ownerDocument), which would prevent the
// document from being garbage-collected (e.g. after an iframe is removed).
const PORTAL_STYLE_ELEMENT_ATTR = 'data-fui-portal-styles';

// Tracks per-document reference counts to support multiple documents (e.g. iframes).
// Only a plain object (no DOM references) is stored as the WeakMap value to avoid a memory leak.
const documentStyleMap = new WeakMap<Document, { refCount: number }>();

function injectPortalMountNodeStyles(document: Document): void {
  const entry = documentStyleMap.get(document);
  if (entry) {
    entry.refCount++;
    return;
  }
  const style = document.createElement('style');
  style.setAttribute(PORTAL_STYLE_ELEMENT_ATTR, '');
  style.textContent = PORTAL_MOUNT_NODE_STYLE_RULE;
  document.head.prepend(style);
  documentStyleMap.set(document, { refCount: 1 });
}

function ejectPortalMountNodeStyles(document: Document): void {
  const entry = documentStyleMap.get(document);
  if (!entry) {
    return;
  }
  entry.refCount--;
  if (entry.refCount === 0) {
    document.querySelector(`style[${PORTAL_STYLE_ELEMENT_ATTR}]`)?.remove();
    documentStyleMap.delete(document);
  }
}

/**
 * Injects a shared <style> element for portal mount node styling into the target document,
 * and returns the class name to apply to the mount node.
 *
 * The style element is reference-counted and removed when the last consumer unmounts.
 */
export function usePortalMountNodeStyles(disabled: boolean | undefined): void {
  const { targetDocument } = useFluent();

  useInsertionEffect!(() => {
    if (disabled || !targetDocument) {
      return;
    }
    injectPortalMountNodeStyles(targetDocument);
    return () => ejectPortalMountNodeStyles(targetDocument);
  }, [disabled, targetDocument]);
}
