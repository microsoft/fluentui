import * as React from 'react';
import { Image, ThemeProvider } from '@fluentui/react-windmod-preview';

import { ImageVrScene, useImageSourcesDecoded } from './ImageVrScene';

export const ImageWindmod = (): React.ReactNode => {
  // ThemeProvider renders a real element, so the gate must sit above it: the runner starts
  // capturing as soon as #storybook-root has any child.
  const decoded = useImageSourcesDecoded();

  if (!decoded) {
    return null;
  }

  return (
    <ThemeProvider>
      <ImageVrScene Image={Image} />
    </ThemeProvider>
  );
};
