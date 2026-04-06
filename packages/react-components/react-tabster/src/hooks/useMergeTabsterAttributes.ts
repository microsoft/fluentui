'use client';

import * as React from 'react';
import { TABSTER_ATTRIBUTE_NAME, type TabsterDOMAttribute } from '../focus-navigation/types';

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

  const stringAttributes = attributes.reduce<string[]>((acc, curr) => {
    if (curr?.[TABSTER_ATTRIBUTE_NAME]) {
      acc.push(curr[TABSTER_ATTRIBUTE_NAME]);
    }
    return acc;
  }, []);

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useWarnIfUnstableAttributes(stringAttributes);
  }

  return React.useMemo(
    () => ({
      [TABSTER_ATTRIBUTE_NAME]: stringAttributes.length > 0 ? stringAttributes.reduce(mergeJSONStrings) : undefined,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    stringAttributes,
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
