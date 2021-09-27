import * as React from 'react';
import { Image } from '../index';

export const ImageBlock = () => (
  <>
    <Image block src="https://via.placeholder.com/900x50" />
    <Image block src="https://via.placeholder.com/100x100" />
  </>
);
ImageBlock.parameters = {
  docs: {
    description: {
      story: 'An Image can be maximized in order to fill its parent container.',
    },
  },
};
