'use client';

import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { useTabster } from './useTabster';

/** Attribute object that can be spread directly onto a DOM element. */
export type TabsterDOMAttribute = Record<string, string | undefined>;

const TABSTER_ATTR = 'data-tabster';

/**
 * Props accepted by useTabsterAttributes. Each key corresponds to a lite module.
 * Fields marked TODO are not yet supported by tabster/lite and are silently ignored.
 * @internal
 */
export interface LiteAttributeProps {
  mover?: {
    direction?: number;
    cyclic?: boolean;
    memorizeCurrent?: boolean;
    hasDefault?: boolean;
    tabbable?: boolean;
    ignoreKeydown?: Record<string, boolean>;
  };
  groupper?: {
    tabbability?: number;
    ignoreKeydown?: Record<string, boolean>;
  };
  modalizer?: {
    id?: string;
    isOthersAccessible?: boolean;
    isTrapped?: boolean;
    isAlwaysAccessible?: boolean;
  };
  restorer?: {
    type: number;
  };
  /**
   * Per-element keydown overrides honored by enclosing mover/groupper to skip their
   * default key handling. Stored as a separate `focusable` key inside the
   * `data-tabster` JSON envelope (matching the historical Tabster format).
   */
  focusable?: {
    isDefault?: boolean;
    isIgnored?: boolean;
    ignoreAriaDisabled?: boolean;
    excludeFromMover?: boolean;
    ignoreKeydown?: Record<string, boolean>;
  };
  /** Serializes to the legacy `observed` key in data-tabster. */
  observed?: {
    names: string[];
  };
  deloser?: Record<string, unknown>;
  /** Marks this element as the tabster root. */
  root?: Record<string, unknown>;
}

/**
 * Returns data-tabster DOM attributes from the given props while
 * ensuring the LiteObserver is running for the current document.
 *
 * Emits a single `data-tabster` attribute whose value is a JSON envelope
 * containing one key per supported module — matching the historical
 * Tabster attribute format (e.g. `data-tabster='{"restorer":{"type":1}}'`).
 *
 * The `observed` prop is serialized to the legacy `observed` key
 * inside `data-tabster`.
 *
 * @internal
 */
export const useTabsterAttributes = (props: LiteAttributeProps): TabsterDOMAttribute => {
  const { targetDocument } = useFluent();
  useTabster();

  const needsGridRootMarker = props.mover?.direction === 3;
  const needsCyclicHorizontalRootMarker = props.mover?.direction === 2 && props.mover.cyclic === true;
  const needsRootMarker = needsGridRootMarker || needsCyclicHorizontalRootMarker;

  useIsomorphicLayoutEffect(() => {
    if (!needsRootMarker) {
      return;
    }

    const doc = targetDocument ?? globalThis.document;
    if (!doc?.body) {
      return;
    }

    const isRtlDocument = (doc.documentElement?.dir ?? doc.body.getAttribute('dir')) === 'rtl';
    const hasRtlSubtree = !!doc.body.querySelector('[dir="rtl"]');
    if (isRtlDocument || (hasRtlSubtree && !needsGridRootMarker)) {
      return;
    }

    const rootAttr = 'data-tabster';
    const rootValue = '{"root":{}}';
    const hadRootAttr = doc.body.hasAttribute(rootAttr);

    if (!hadRootAttr) {
      doc.body.setAttribute(rootAttr, rootValue);
    }

    return () => {
      if (!hadRootAttr && doc.body.getAttribute(rootAttr) === rootValue) {
        doc.body.removeAttribute(rootAttr);
      }
    };
  }, [needsGridRootMarker, needsRootMarker, targetDocument]);

  // Serialise each supported module to a string for stable useMemo deps.
  const moverStr = props.mover !== undefined ? JSON.stringify(props.mover) : undefined;
  const groupperStr = props.groupper !== undefined ? JSON.stringify(props.groupper) : undefined;
  const modalizerStr = props.modalizer !== undefined ? JSON.stringify(props.modalizer) : undefined;
  const restorerStr = props.restorer !== undefined ? JSON.stringify(props.restorer) : undefined;
  const focusableStr = props.focusable !== undefined ? JSON.stringify(props.focusable) : undefined;
  const deloserStr = props.deloser !== undefined ? JSON.stringify(props.deloser) : undefined;
  const observedStr = props.observed !== undefined ? JSON.stringify(props.observed) : undefined;
  const rootStr = props.root !== undefined ? JSON.stringify(props.root) : undefined;

  return React.useMemo(() => {
    const attrs: TabsterDOMAttribute = {};

    const parts: string[] = [];
    if (moverStr !== undefined) {
      parts.push(`"mover":${moverStr}`);
    }
    if (groupperStr !== undefined) {
      parts.push(`"groupper":${groupperStr}`);
    }
    if (modalizerStr !== undefined) {
      parts.push(`"modalizer":${modalizerStr}`);
    }
    if (restorerStr !== undefined) {
      parts.push(`"restorer":${restorerStr}`);
    }
    if (focusableStr !== undefined) {
      parts.push(`"focusable":${focusableStr}`);
    }
    if (deloserStr !== undefined) {
      parts.push(`"deloser":${deloserStr}`);
    }
    if (observedStr !== undefined) {
      parts.push(`"observed":${observedStr}`);
    }
    if (rootStr !== undefined) {
      parts.push(`"root":${rootStr}`);
    }

    if (parts.length > 0) {
      attrs[TABSTER_ATTR] = `{${parts.join(',')}}`;
    }
    return attrs;
  }, [moverStr, groupperStr, modalizerStr, restorerStr, focusableStr, deloserStr, observedStr, rootStr]);
};
