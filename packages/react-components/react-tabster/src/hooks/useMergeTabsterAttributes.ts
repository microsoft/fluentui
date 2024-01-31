import * as React from 'react';
import { Types } from 'tabster';

/**
 * Merges a collection of tabster attributes.
 *
 * ⚠️The attributes passed as arguments to this  hook cannot change at runtime.
 * @internal
 * @param attributes - collection of tabster attributes from other react-tabster hooks
 * @returns single merged tabster attribute
 */
export const useMergedTabsterAttributes_unstable: (
  ...attributes: Types.TabsterDOMAttribute[]
) => Types.TabsterDOMAttribute = (...attributes) => {
  const stringAttributes = attributes
    .map(attribute => attribute[Types.TabsterAttributeName])
    .filter(Boolean) as string[];

  return React.useMemo(() => {
    let attribute = stringAttributes[0];
    attributes.shift();

    for (const attr of stringAttributes) {
      attribute = mergeAttributes(attribute, attr);
    }

    return { [Types.TabsterAttributeName]: attribute };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, stringAttributes);
};

function mergeAttributes(a: string, b?: string): string {
  if (!b) {
    return a;
  }

  let aParsed = {};
  let bParsed = {};
  if (a) {
    try {
      aParsed = JSON.parse(a);
      // eslint-disable-next-line no-empty
    } catch {}
  }

  if (b) {
    try {
      bParsed = JSON.parse(b);
      // eslint-disable-next-line no-empty
    } catch {}
  }

  return JSON.stringify({ ...aParsed, ...bParsed });
}
