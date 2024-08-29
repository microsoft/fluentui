import * as React from 'react';
/**
 * {@docCategory Virtualizer}
 */
export type VirtualizerContextProps = {
  contextIndex: number;
  setContextIndex: (index: number) => void;
  contextPosition: number;
  setContextPosition: (index: number) => void;
  childProgressiveSizes: React.MutableRefObject<number[]>;
};
