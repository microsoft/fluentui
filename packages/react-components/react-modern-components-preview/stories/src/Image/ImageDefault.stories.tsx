import * as React from 'react';

import { Image } from '@fluentui/react-modern-components-preview/image';
import type { ImageProps } from '@fluentui/react-modern-components-preview/image';
import type { ArgTypes, Parameters } from '@storybook/react-webpack5';

export const Default = (props: ImageProps): React.ReactNode => {
  return (
    <Image
      {...props}
      alt="Allan's avatar"
      src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AllanMunger.jpg"
    />
  );
};

Default.argTypes = {
  alt: {
    control: 'text',
    defaultValue: 'Image placeholder',
    description: `description of the image, which isn't mandatory but is incredibly useful for accessibility`,
  },
  src: {
    control: 'text',
    defaultValue: 'https://fabricweb.azureedge.net/fabric-website/placeholders/300x300.png',
    description: 'path to the image you want to display',
  },
  as: { table: { disable: true } },
} as ArgTypes;
Default.parameters = {
  controls: {
    disable: false,
  },
} as Parameters;
