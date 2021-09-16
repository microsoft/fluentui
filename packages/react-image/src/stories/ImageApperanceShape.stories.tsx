import * as React from 'react';
import { Image } from '../index';

export const ImageAppearanceShape = () => (
  <>
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
  </>
);
ImageAppearanceShape.parameters = {
  docs: {
    description: {
      story: 'Images can be styled as square, rounded corners or circular.',
    },
  },
};
