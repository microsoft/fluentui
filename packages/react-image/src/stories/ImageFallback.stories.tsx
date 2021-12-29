import * as React from 'react';
import { Image } from '../Image';

export const Fallback = () => (
  <div style={{ display: 'flex', gap: 8 }}>
    <Image
      alt="Allan's avatar"
      bordered
      src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AllanMunger.jpg"
      height={200}
      width={200}
    />
    <Image
      alt="Non-existing avatar"
      bordered
      src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/non-existing-png.jpg"
      height={200}
      width={200}
    />
  </div>
);
Fallback.parameters = {
  docs: {
    description: {
      story:
        'In cases when images fail to load, the Image component will result into the native `<img/>` browser fallback.',
    },
  },
};
