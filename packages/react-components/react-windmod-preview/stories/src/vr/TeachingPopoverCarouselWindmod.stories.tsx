import * as React from 'react';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';

import { TeachingPopoverCarouselVrScene } from './TeachingPopoverCarouselVrScene';
import { windmodParts } from './carouselSceneParts';

export const TeachingPopoverCarouselWindmod = (): React.ReactNode => (
  <FluentProvider>
    <TeachingPopoverCarouselVrScene {...windmodParts} />
  </FluentProvider>
);
