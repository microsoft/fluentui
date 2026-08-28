import * as React from 'react';
import { FluentProvider } from '@fluentui/react-windmod-preview';

import { TeachingPopoverCarouselVrScene } from './TeachingPopoverCarouselVrScene';
import { windmodParts } from './carouselSceneParts';

export const TeachingPopoverCarouselBrandWindmod = (): React.ReactNode => (
  <FluentProvider>
    <TeachingPopoverCarouselVrScene {...windmodParts} appearance="brand" />
  </FluentProvider>
);
