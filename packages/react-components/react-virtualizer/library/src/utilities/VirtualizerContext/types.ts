import * as React from 'react';
/**
 * {@docCategory Virtualizer}
 */
export type VirtualizerContextProps = {
  contextIndex: number;
  setContextIndex: (index: number) => void;
  /*
   * These option props are used in dynamic virtualizer
   */
  contextPosition?: number;
  setContextPosition?: (index: number) => void;
  childProgressiveSizes?: React.MutableRefObject<number[]>;
};

export type DynamicVirtualizerContextProps = Required<VirtualizerContextProps>;
