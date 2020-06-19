import React from 'react';
import { KeytipLayer } from '@fluentui/react-next';

export const withKeytipLayer = storyFn => {
  return (
    <>
      <KeytipLayer content="Alt Windows" />
      {storyFn()}
    </>
  );
};
