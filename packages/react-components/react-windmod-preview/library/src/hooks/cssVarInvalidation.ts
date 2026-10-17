'use client';

import * as React from 'react';
import { useSyncExternalStore } from 'use-sync-external-store/shim';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';

/**
 * What a provider publishes to the subtree below it.
 *
 * `id` is a per-provider object identity. Versions are plain counters that every provider
 * starts at 0, so sibling providers publish equal numbers as the normal case; without an
 * identity, an element moved between two such scopes takes a cache hit and is served the other
 * scope's value. The identity is an object, so it can never collide.
 *
 * `version` counts observer-driven invalidations and is composed as
 * `parentVersion + ownVersion` — counters only increment, so a bump always strictly increases
 * the sum and the two operands cannot cancel.
 *
 * `signature` is the render-time half. A provider's own `className`/`style` are written by
 * React during commit, before layout effects run, so a MutationObserver alone reports them one
 * microtask late and the consumer serves a stale value for that commit. Folding the composed
 * signature into the published scope removes that window.
 */
export type CssVarScope = {
  id: object;
  version: number;
  signature: string;
};

/** Identity for consumers with no FluentProvider ancestor. Module-level, so it is stable. */
const rootScope: CssVarScope = { id: {}, version: 0, signature: '' };

export const CssVarInvalidationContext: React.Context<CssVarScope | undefined> = React.createContext<
  CssVarScope | undefined
>(undefined);

/**
 * Reads the nearest provider's published scope. A consumer outside any FluentProvider is
 * legitimate — it resolves against the document root — so the missing context falls back to a
 * stable module-level scope rather than throwing.
 */
export function useCssVarScope(): CssVarScope {
  return React.useContext(CssVarInvalidationContext) ?? rootScope;
}

let rootVersion = 0;
const rootListeners = new Set<() => void>();
const documentObservers = new Map<Document, { observer: MutationObserver; refCount: number }>();

function emitRootVersion(): void {
  rootVersion += 1;

  for (const listener of rootListeners) {
    listener();
  }
}

/**
 * Invalidates every mounted `useCssVarValue` consumer, in every document.
 *
 * The escape hatch for anything the provider and root observers cannot see — the motivating
 * case is a zoom control changing what base-scale-derived variables resolve to.
 */
export function invalidateCssVars(): void {
  emitRootVersion();
}

/**
 * Observes `documentElement`'s `style` attribute in `targetDocument`, refcounted so a document
 * carries exactly one observer however many providers live in it. Returns the release callback.
 *
 * A bump from any observed document invalidates consumers in every document. Over-invalidating
 * across documents costs a re-read and can never produce a wrong value, which is why the store
 * stays single and module-global rather than partitioned per document.
 */
export function observeCssVarDocument(targetDocument: Document): () => void {
  const targetWindow = targetDocument.defaultView;

  if (!targetWindow) {
    return () => undefined;
  }

  const existing = documentObservers.get(targetDocument);

  if (existing) {
    existing.refCount += 1;
  } else {
    const observer = new targetWindow.MutationObserver(emitRootVersion);

    observer.observe(targetDocument.documentElement, { attributes: true, attributeFilter: ['style'] });
    documentObservers.set(targetDocument, { observer, refCount: 1 });
  }

  return () => {
    const entry = documentObservers.get(targetDocument);

    if (!entry) {
      return;
    }

    entry.refCount -= 1;

    if (entry.refCount <= 0) {
      entry.observer.disconnect();
      documentObservers.delete(targetDocument);
    }
  };
}

/**
 * Listener bookkeeping only. The observed DOCUMENT is registered separately, by whoever holds
 * an element — there is no ambient document to reach for here, and the document a consumer
 * lives in is the one worth observing.
 */
function subscribeRootVersion(listener: () => void): () => void {
  rootListeners.add(listener);

  return () => {
    rootListeners.delete(listener);
  };
}

function getRootVersion(): number {
  return rootVersion;
}

/** SSR has no DOM to observe, so the server snapshot is a constant. */
function getServerRootVersion(): number {
  return 0;
}

/** Subscribes to the module-global root version. */
export function useRootCssVarVersion(): number {
  return useSyncExternalStore(subscribeRootVersion, getRootVersion, getServerRootVersion);
}

/**
 * Length-prefixes a part so the signature join is unambiguous without reserving a character.
 * A class name may contain any character, and an ambiguous join would let two different
 * (parent, own) pairs collapse to one signature — a collision there is a MISSED invalidation,
 * not merely a wasted read.
 */
function taggedPart(part: string): string {
  return `${part.length}:${part}`;
}

/**
 * Publishes a {@link CssVarScope} for the subtree below `elementRef`. Called by FluentProvider
 * on its OWN fiber — never rendered as a child component.
 *
 * React attaches host refs in commit order, so a child component's layout effect runs BEFORE
 * the parent host element's ref is populated: a child would find `elementRef.current === null`
 * and never install the observer. Owning the effect on the provider's fiber is what makes the
 * element available.
 *
 * The observer covers what render-time props cannot see — an external `classList`/`style`
 * mutation on the provider element. The `className`/`style` arguments cover the prop-driven
 * half in the same commit that applies it.
 */
export function useCssVarInvalidationScope(
  elementRef: React.RefObject<HTMLElement | null>,
  className: string,
  style: React.CSSProperties | undefined,
): CssVarScope {
  const parentScope = useCssVarScope();
  // Held in state, not a ref: the identity is READ during render to publish the scope, and a
  // ref's current value is not a render-time input.
  const [id] = React.useState<object>(() => ({}));
  const [ownVersion, setOwnVersion] = React.useState(0);

  useIsomorphicLayoutEffect(() => {
    const element = elementRef.current;
    const targetWindow = element?.ownerDocument?.defaultView;

    if (!element || !targetWindow) {
      return;
    }

    const observer = new targetWindow.MutationObserver(() => setOwnVersion(previous => previous + 1));

    observer.observe(element, { attributes: true, attributeFilter: ['class', 'style'] });

    const releaseDocument = observeCssVarDocument(element.ownerDocument);

    return () => {
      observer.disconnect();
      releaseDocument();
    };
  }, [elementRef]);

  const parentVersion = parentScope.version;
  const parentSignature = parentScope.signature;
  const ownSignature = `${taggedPart(className)}${style ? JSON.stringify(style) : ''}`;

  return React.useMemo(
    () => ({
      id,
      version: parentVersion + ownVersion,
      signature: `${taggedPart(parentSignature)}${ownSignature}`,
    }),
    [id, parentVersion, ownVersion, parentSignature, ownSignature],
  );
}
