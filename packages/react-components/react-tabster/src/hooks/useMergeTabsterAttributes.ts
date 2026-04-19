'use client';

import * as React from 'react';
import type { TabsterDOMAttribute } from './useTabsterAttributes';

/**
 * Merges a collection of tabster attributes.
 *
 * ⚠️The attributes passed as arguments to this hook cannot change at runtime.
 * @internal
 * @param attributes - collection of tabster attributes from other react-tabster hooks
 * @returns single merged tabster attribute
 */
export const useMergedTabsterAttributes_unstable = (
  ...attributes: (Partial<TabsterDOMAttribute> | null | undefined)[]
): TabsterDOMAttribute => {
  'use no memo';

  // Collect per-module JSON strings keyed by attribute name.
  const perModule: Record<string, string[]> = {};

  for (const attr of attributes) {
    if (!attr) continue;
    for (const [key, value] of Object.entries(attr)) {
      if (value === undefined) continue;
      if (!perModule[key]) perModule[key] = [];
      perModule[key].push(value);
    }
  }

  // Produce a flat array of [key, mergedValue] pairs for the useMemo dep.
  const pairs = Object.entries(perModule).map(([key, values]): [string, string] => [
    key,
    values.length === 1 ? values[0] : values.reduce(mergeJSONStrings),
  ]);

  const pairStrings = pairs.map(([k, v]) => `${k}=${v}`);

  if (process.env.NODE_ENV !== 'production') {
    // ignoring rules of hooks because this is a condition based on the environment
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useWarnIfUnstableAttributes(pairStrings);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useMemo(
    () => Object.fromEntries(pairs),
    // disable exhaustive-deps: attributes are not expected to change at runtime
    // eslint-disable-next-line react-hooks/exhaustive-deps
    pairStrings,
  );
};

const mergeJSONStrings = (a: string, b: string): string =>
  JSON.stringify(Object.assign(safelyParseJSON(a), safelyParseJSON(b)));

const safelyParseJSON = (json: string): object => {
  try {
    return JSON.parse(json);
  } catch {
    return {};
  }
};

const useWarnIfUnstableAttributes = (attributes: string[]) => {
  'use no memo';

  const initialAttributesRef = React.useRef(attributes);

  let isStable = initialAttributesRef.current.length === attributes.length;
  if (initialAttributesRef.current !== attributes && isStable) {
    for (let i = 0; i < attributes.length; i++) {
      if (initialAttributesRef.current[i] !== attributes[i]) {
        isStable = false;
        break;
      }
    }
  }
  React.useEffect(() => {
    if (!isStable) {
      const error = new Error();
      // eslint-disable-next-line no-console
      console.warn(/** #__DE-INDENT__ */ `
        @fluentui/react-tabster [useMergedTabsterAttributes]:
        The attributes passed to the hook changed at runtime.
        This might lead to unexpected behavior, please ensure that the attributes are stable.
        ${error.stack}
      `);
    }
  }, [isStable]);
};
