'use client';

import * as React from 'react';
import { useTabster } from './useTabster';

/** Attribute object that can be spread directly onto a DOM element. */
export type TabsterDOMAttribute = Record<string, string | undefined>;

const TABSTER_ATTR = 'data-tabster';
const OBSERVED_ATTR = 'data-tabster-lite-observed';

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
    ignoreKeydown?: Record<string, boolean>;
  };
  /** Sets data-tabster-lite-observed on the element. Multiple names are stored as space-separated tokens. */
  observed?: {
    names: string[];
  };
  deloser?: Record<string, unknown>;
}

/**
 * Returns data-tabster DOM attributes from the given props while
 * ensuring the LiteObserver is running for the current document.
 *
 * Emits a single `data-tabster` attribute whose value is a JSON envelope
 * containing one key per supported module — matching the historical
 * Tabster attribute format (e.g. `data-tabster='{"restorer":{"type":1}}'`).
 *
 * The `observed` prop is emitted as a separate `data-tabster-lite-observed`
 * attribute (string-valued, not part of the JSON envelope).
 *
 * @internal
 */
export const useTabsterAttributes = (props: LiteAttributeProps): TabsterDOMAttribute => {
  useTabster();

  // Serialise each supported module to a string for stable useMemo deps.
  const moverStr = props.mover !== undefined ? JSON.stringify(props.mover) : undefined;
  const groupperStr = props.groupper !== undefined ? JSON.stringify(props.groupper) : undefined;
  const modalizerStr = props.modalizer !== undefined ? JSON.stringify(props.modalizer) : undefined;
  const restorerStr = props.restorer !== undefined ? JSON.stringify(props.restorer) : undefined;
  const focusableStr = props.focusable !== undefined ? JSON.stringify(props.focusable) : undefined;
  const deloserStr = props.deloser !== undefined ? JSON.stringify(props.deloser) : undefined;
  const observedName = props.observed?.names.join(' ');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useMemo(() => {
    const attrs: TabsterDOMAttribute = {};

    const parts: string[] = [];
    if (moverStr !== undefined) parts.push(`"mover":${moverStr}`);
    if (groupperStr !== undefined) parts.push(`"groupper":${groupperStr}`);
    if (modalizerStr !== undefined) parts.push(`"modalizer":${modalizerStr}`);
    if (restorerStr !== undefined) parts.push(`"restorer":${restorerStr}`);
    if (focusableStr !== undefined) parts.push(`"focusable":${focusableStr}`);
    if (deloserStr !== undefined) parts.push(`"deloser":${deloserStr}`);

    if (parts.length > 0) {
      attrs[TABSTER_ATTR] = `{${parts.join(',')}}`;
    }
    if (observedName !== undefined) attrs[OBSERVED_ATTR] = observedName;

    return attrs;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moverStr, groupperStr, modalizerStr, restorerStr, focusableStr, deloserStr, observedName]);
};
