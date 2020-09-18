import * as React from 'react';
import { KeytipLayer } from 'office-ui-fabric-react';

export const CompatKeytipLayerWrapper: React.FunctionComponent<{}> = props => {
  return (
    <>
      <KeytipLayer content="Alt Windows" />
      {props.children}
    </>
  );
};

export const withCompatKeytipLayer = (storyFn: () => React.ReactNode) => {
  return <CompatKeytipLayerWrapper>{storyFn()}</CompatKeytipLayerWrapper>;
};
