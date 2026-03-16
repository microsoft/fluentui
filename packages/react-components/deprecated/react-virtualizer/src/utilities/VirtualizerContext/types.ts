import * as React from 'react';
/**
 * {@docCategory Virtualizer}
 * @deprecated migrated to \@fluentui\-contrib/react\-virtualizer for stable release.
 */
export type VirtualizerContextProps = {
  contextIndex: number;
  setContextIndex: (index: number) => void;
  /*
   * These optional props are used in dynamic virtualizer
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  childProgressiveSizes?: React.MutableRefObject<number[]>;
};

/**
 * Some props are optional on static virtualizer, but required for dynamic.
 * @deprecated migrated to \@fluentui\-contrib/react\-virtualizer for stable release.
 */
export type DynamicVirtualizerContextProps = Required<VirtualizerContextProps>;
