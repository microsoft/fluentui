import * as React from 'react';
import { Image } from '../index';

export const ImageFluid = () => (
  <>
    <Image fluid src="https://via.placeholder.com/900x50" />
    <Image fluid src="https://via.placeholder.com/100x100" />
  </>
);
ImageFluid.parameters = {
  docs: {
    description: {
      story: 'An Image can be maximized in order to fill its parent container.',
    },
  },
};
