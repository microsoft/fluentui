import * as React from 'react';
import { Image } from '../index';

export const ImageShadow = () => <Image shadow src="https://via.placeholder.com/300x300" />;
ImageShadow.parameters = {
  docs: {
    description: {
      story: 'The shadow prop will apply box shadow styling to the image',
    },
  },
};
