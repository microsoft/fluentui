import * as React from 'react';
import { Image } from '@fluentui/react-windmod-preview/image';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';

import { ImageVrScene, useImageSourcesDecoded } from './ImageVrScene';

export const ImageWindmod = (): React.ReactNode => {
  // FluentProvider renders a real element, so the gate must sit above it: the runner starts
  // capturing as soon as #storybook-root has any child.
  const decoded = useImageSourcesDecoded();

  if (!decoded) {
    return null;
  }

  return (
    <FluentProvider>
      <ImageVrScene Image={Image} />
    </FluentProvider>
  );
};
