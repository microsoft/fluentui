import * as React from 'react';
import { FluentProvider, Image, webLightTheme } from '@fluentui/react-components';

import { ImageVrScene, useImageSourcesDecoded } from './ImageVrScene';

export const ImageGriffel = (): React.ReactNode => {
  // See ImageWindmod.stories — the gate must sit above the provider.
  const decoded = useImageSourcesDecoded();

  if (!decoded) {
    return null;
  }

  return (
    <FluentProvider theme={webLightTheme}>
      <ImageVrScene Image={Image} />
    </FluentProvider>
  );
};
