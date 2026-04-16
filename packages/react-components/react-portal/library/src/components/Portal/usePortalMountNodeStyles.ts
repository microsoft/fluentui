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
const PORTAL_STYLE_ELEMENT_ATTR = 'data-fui-portal-styles';

// Symbol used as a "private" property key on Document to store the active portal reference count.
// Symbol.for() registers in the global Symbol registry so the same key is shared across bundles
// (e.g. when multiple copies of this module are loaded in the same page).
// Storing state directly on the document avoids any WeakMap cross-reference issues and is safe
// across multiple documents (e.g. iframes) because each document object carries its own counter.
const PORTAL_STYLE_REF_COUNT = Symbol.for('fui-portal-style-ref-count');

type DocumentWithPortalCounter = Document & { [PORTAL_STYLE_REF_COUNT]?: number };

function getPortalRefCount(doc: Document): number {
  return (doc as DocumentWithPortalCounter)[PORTAL_STYLE_REF_COUNT] ?? 0;
}

function setPortalRefCount(doc: Document, count: number): void {
  (doc as DocumentWithPortalCounter)[PORTAL_STYLE_REF_COUNT] = count;
}

function injectPortalMountNodeStyles(doc: Document): void {
  const currentCount = getPortalRefCount(doc);
  if (currentCount > 0) {
    setPortalRefCount(doc, currentCount + 1);
    return;
  }
  const style = doc.createElement('style');
  style.setAttribute(PORTAL_STYLE_ELEMENT_ATTR, '');
  // Prepend so that consumer class names (applied later in document order) can override these
  // defaults via CSS source order at equal specificity — the same cascade behaviour as before.
  // Both prepend and append trigger one style recalculation; position in <head> does not change
  // the number of recalcs.
  doc.head.prepend(style);
  // sheet is available after the element is inserted into the document
  style.sheet?.insertRule(PORTAL_MOUNT_NODE_STYLE_RULE);
  setPortalRefCount(doc, 1);
}

function ejectPortalMountNodeStyles(doc: Document): void {
  const currentCount = getPortalRefCount(doc);
  if (currentCount === 0) {
    return;
  }
  const newCount = currentCount - 1;
  if (newCount === 0) {
    doc.head.querySelector(`style[${PORTAL_STYLE_ELEMENT_ATTR}]`)?.remove();
  }
  setPortalRefCount(doc, newCount);
}

/**
 * Injects a shared <style> element for portal mount node styling into the target document,
 * and removes it when the last consumer unmounts (reference counted via a Symbol property on `document`).
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
