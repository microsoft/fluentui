import * as React from 'react';
import { Image } from '../Image';

export const Block = () => (
  <>
    <Image block src="https://fabricweb.azureedge.net/fabric-website/placeholders/900x50.png" />
    <Image block src="https://fabricweb.azureedge.net/fabric-website/placeholders/100x100.png" />
  </>
);
Block.parameters = {
  docs: {
    description: {
      story: 'An Image can be maximized in order to fill its parent container.',
    },
  },
};
