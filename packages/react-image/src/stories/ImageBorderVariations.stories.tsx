import * as React from 'react';
import { Image } from '../index';

export const ImageBorderVariations = () => (
  <div>
    <div style={{ display: 'flex', gap: 8 }}>
      <Image
        alt="Allan's avatar"
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AllanMunger.jpg"
        height={200}
        width={200}
      />
      <Image
        alt="Amanda's avatar"
        rounded
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AmandaBrady.jpg"
        height={200}
        width={200}
      />
      <Image
        alt="Erik's avatar"
        circular
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/ErikNason.jpg"
        height={200}
        width={200}
      />
    </div>
    <div style={{ display: 'flex', gap: 8, marginTop: '15px' }}>
      <Image
        alt="Allan's avatar"
        bordered
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AllanMunger.jpg"
        height={200}
        width={200}
      />
      <Image
        alt="Amanda's avatar"
        bordered
        rounded
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AmandaBrady.jpg"
        height={200}
        width={200}
      />
      <Image
        alt="Erik's avatar"
        bordered
        circular
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/ErikNason.jpg"
        height={200}
        width={200}
      />
    </div>
  </div>
);
ImageBorderVariations.parameters = {
  docs: {
    description: {
      story: 'The `bordered` prop will apply a border style to images regardless of its shape.',
    },
  },
};
