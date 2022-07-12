import * as React from 'react';
import { Image } from '@fluentui/react-components';
import type { ImageProps } from '@fluentui/react-components';
import type { ArgTypes, Parameters } from '@storybook/react';

export const Default = (props: ImageProps) => {
  return <Image {...props} />;
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
