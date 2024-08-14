import * as React from 'react';
import { Types, TABSTER_ATTRIBUTE_NAME } from 'tabster';

/**
 * Merges a collection of tabster attributes.
 *
 * ⚠️The attributes passed as arguments to this  hook cannot change at runtime.
 * @internal
 * @param attributes - collection of tabster attributes from other react-tabster hooks
 * @returns single merged tabster attribute
 */
export const useMergedTabsterAttributes_unstable = (
  ...attributes: Partial<Types.TabsterDOMAttribute>[]
): Types.TabsterDOMAttribute => {
  'use no memo';

  const stringAttributes = attributes.reduce<string[]>((acc, curr) => {
    if (curr[TABSTER_ATTRIBUTE_NAME]) {
      acc.push(curr[TABSTER_ATTRIBUTE_NAME]);
    }
    return acc;
  }, []);

  return React.useMemo(
    () => ({
      [TABSTER_ATTRIBUTE_NAME]: stringAttributes.length > 0 ? stringAttributes.reduce(mergeJSONStrings) : undefined,
    }),
    // disable exhaustive-deps because we want to memoize the result of the reduction
    // this is safe because the collection of attributes is not expected to change at runtime
    // eslint-disable-next-line react-hooks/exhaustive-deps
    stringAttributes,
  );
};

/**
 * Merges two JSON strings into one.
 */
const mergeJSONStrings = (a: string, b: string): string =>
  JSON.stringify(Object.assign(safelyParseJSON(a), safelyParseJSON(b)));

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
