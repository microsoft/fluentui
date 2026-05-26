import * as React from 'react';

// Sibling base hook used to verify cross-file pair detection in the rule's spec.
// The wrapping state hook lives in `useSibling.ts` next to this file.
export const useSiblingBase_unstable = (props: { a: number }, ref: React.Ref<HTMLElement>) => {
  return { props, ref };
};
