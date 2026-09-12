'use client';

import * as React from 'react';
import type { Types } from 'tabster';
import { TABSTER_ATTRIBUTE_NAME } from 'tabster';

/**
 * Merges a collection of tabster attributes.
 *
 * The result is memoized and only recomputed when the contributing attributes
 * actually change, so both the values and the number of attributes may change
 * at runtime.
 * @internal
 * @param attributes - collection of tabster attributes from other react-tabster hooks
 * @returns single merged tabster attribute
 */
export const useMergedTabsterAttributes_unstable = (
  ...attributes: (Partial<Types.TabsterDOMAttribute> | null | undefined)[]
): Types.TabsterDOMAttribute => {
  // The collected attributes are reduced to a single primitive `key` so the
  // `React.useMemo` dependency list keeps a constant size, even when the number
  // of contributing attributes changes between renders. The array and the key
  // are built in a single pass.
  const stringAttributes: string[] = [];
  let key = '';
  for (const attribute of attributes) {
    const value = attribute?.[TABSTER_ATTRIBUTE_NAME];
    if (value) {
      stringAttributes.push(value);
      key += value + MERGE_KEY_SEPARATOR;
    }
  }

  return React.useMemo(
    () => ({ [TABSTER_ATTRIBUTE_NAME]: mergeAttributes(stringAttributes) }),
    // `key` fully captures the contents of `stringAttributes`, which is rebuilt
    // on every render and therefore cannot be a dependency itself.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key],
  );
};

/**
 * `NUL` separator used to build the memoization key. It is a safe separator
 * because the attribute values originate from `JSON.stringify`, which escapes
 * control characters, so a literal `NUL` can never appear inside one of them.
 */
const MERGE_KEY_SEPARATOR = '\u0000';

/**
 * Merges a collection of tabster attribute JSON strings into a single one.
 * Later attributes take priority over earlier ones.
 */
const mergeAttributes = (stringAttributes: string[]): string | undefined => {
  if (stringAttributes.length === 0) {
    return undefined;
  }
  // common case: a single hook contributed an attribute, no parsing required
  if (stringAttributes.length === 1) {
    return stringAttributes[0];
  }
  return JSON.stringify(Object.assign({}, ...stringAttributes.map(safelyParseJSON)));
};

/**
 * Tries to parse a JSON string and returns an object.
 * If the JSON string is invalid, an empty object is returned.
 */
const safelyParseJSON = (json: string): object => {
  try {
    return JSON.parse(json);
  } catch {
    return {};
  }
};
