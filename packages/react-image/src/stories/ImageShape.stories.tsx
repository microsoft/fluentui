import * as React from 'react';
import { Image } from '../index';

export const ImageShape = () => (
  <div style={{ display: 'flex', gap: 8 }}>
    <Image
      alt="Allan's avatar"
      src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AllanMunger.jpg"
      height={200}
      width={200}
    />
    <Image
      alt="Erik's avatar"
      shape="circular"
      src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/ErikNason.jpg"
      height={200}
      width={200}
    />
    <Image
      alt="Amanda's avatar"
      shape="rounded"
      src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AmandaBrady.jpg"
      height={200}
      width={200}
    />
  </div>
);
ImageShape.parameters = {
  docs: {
    description: {
      story: 'Images can be styled as square (default), circular, or with rounded corners.',
    },
  },
};
