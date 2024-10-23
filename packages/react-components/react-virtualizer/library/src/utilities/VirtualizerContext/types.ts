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
  childProgressiveSizes?: React.MutableRefObject<number[]>;
};

/**
 * Some props are optional on static virtualizer, but required for dynamic.
 */
export type DynamicVirtualizerContextProps = Required<VirtualizerContextProps>;
