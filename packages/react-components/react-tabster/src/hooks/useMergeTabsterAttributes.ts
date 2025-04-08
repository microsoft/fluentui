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
  ...attributes: (Partial<Types.TabsterDOMAttribute> | null | undefined)[]
): Types.TabsterDOMAttribute => {
  'use no memo';

  const stringAttributes = attributes.reduce<string[]>((acc, curr) => {
    if (curr?.[TABSTER_ATTRIBUTE_NAME]) {
      acc.push(curr[TABSTER_ATTRIBUTE_NAME]);
    }
    return acc;
  }, []);

  if (process.env.NODE_ENV !== 'production') {
    // ignoring rules of hooks because this is a condition based on the environment
    // it's safe to ignore the rule
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useWarnIfUnstableAttributes(stringAttributes);
  }

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

/**
 * Helper hook that ensures that the attributes passed to the hook are stable.
 * This is necessary because the attributes are expected to not change at runtime.
 *
 * This hook will console.warn if the attributes change at runtime.
 */
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
