import * as React from 'react';
import { KeytipLayer } from '@fluentui/react/lib/Keytips';

export const KeytipLayerWrapper: React.FunctionComponent<{ children?: React.ReactNode }> = props => {
  return (
    <>
      <KeytipLayer content="Alt Windows" />
      {props.children}
    </>
  );
};

export const withKeytipLayer = (storyFn: () => React.ReactNode) => {
  return <KeytipLayerWrapper>{storyFn()}</KeytipLayerWrapper>;
};
