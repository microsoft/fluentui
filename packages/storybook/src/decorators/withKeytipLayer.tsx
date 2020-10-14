import * as React from 'react';
import { KeytipLayer } from '@fluentui/react/lib/Keytips';

export const KeytipLayerWrapper: React.FunctionComponent<{}> = props => {
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
