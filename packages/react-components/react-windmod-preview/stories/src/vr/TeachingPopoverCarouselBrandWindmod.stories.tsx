import * as React from 'react';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';

import { TeachingPopoverCarouselVrScene } from './TeachingPopoverCarouselVrScene';
import { windmodParts } from './carouselSceneParts';

export const TeachingPopoverCarouselBrandWindmod = (): React.ReactNode => (
  <FluentProvider>
    <TeachingPopoverCarouselVrScene {...windmodParts} appearance="brand" />
  </FluentProvider>
);
