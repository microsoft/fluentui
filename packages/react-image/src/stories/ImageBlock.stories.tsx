import * as React from 'react';
import { Image } from '../Image'; // codesandbox-dependency: @fluentui/react-image ^9.0.0-beta

export const Block = () => (
  <>
    <Image block src="https://via.placeholder.com/900x50" />
    <Image block src="https://via.placeholder.com/100x100" />
  </>
);
Block.parameters = {
  docs: {
    description: {
      story: 'An Image can be maximized in order to fill its parent container.',
    },
  },
};
