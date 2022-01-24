import * as React from 'react';
import type { ImageProps } from '../Image';
import type { ArgTypes, Parameters } from '@storybook/react';
import { Image } from '../Image';

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
    defaultValue: 'https://via.placeholder.com/300x300',
    description: 'path to the image you want to display',
  },
  as: { table: { disable: true } },
} as ArgTypes;
Default.parameters = {
  controls: {
    disable: false,
  },
} as Parameters;
