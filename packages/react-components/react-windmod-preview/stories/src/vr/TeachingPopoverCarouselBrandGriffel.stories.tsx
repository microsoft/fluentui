import * as React from 'react';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';

import { TeachingPopoverCarouselVrScene } from './TeachingPopoverCarouselVrScene';
import { griffelParts } from './carouselSceneParts';

export const TeachingPopoverCarouselBrandGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <TeachingPopoverCarouselVrScene {...griffelParts} appearance="brand" />
  </FluentProvider>
);
