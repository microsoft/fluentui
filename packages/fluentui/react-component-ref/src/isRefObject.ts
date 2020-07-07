import * as React from 'react';

/** Checks that the passed object is a valid React ref object. */
export const isRefObject = (ref: any): ref is React.RefObject<any> =>
  // https://github.com/facebook/react/blob/v16.8.2/packages/react-reconciler/src/ReactFiberCommitWork.js#L665
  ref !== null && typeof ref === 'object' && ref.hasOwnProperty('current');
