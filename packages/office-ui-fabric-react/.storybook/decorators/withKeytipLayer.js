import React from 'react';
import { KeytipLayer } from 'office-ui-fabric-react';

export const withKeytipLayer = storyFn => {
  return (
    <>
      <KeytipLayer content="Alt Windows" />
      {storyFn()}
    </>
  );
};
