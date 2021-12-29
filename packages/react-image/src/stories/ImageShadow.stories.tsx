import * as React from 'react';
import { Image } from '../Image';

export const Shadow = () => <Image shadow src="https://via.placeholder.com/300x300" />;
Shadow.parameters = {
  docs: {
    description: {
      story: 'The shadow prop will apply box shadow styling to the image.',
    },
  },
};
