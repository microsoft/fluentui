import * as React from 'react';
import { FluentProvider } from '@fluentui/react-windmod-preview';

import { rtlCells, TeachingPopoverCarouselVrScene } from './TeachingPopoverCarouselVrScene';
import { windmodParts } from './carouselSceneParts';

export const TeachingPopoverCarouselRtlWindmod = (): React.ReactNode => (
  <FluentProvider dir="rtl">
    <TeachingPopoverCarouselVrScene {...windmodParts} cells={rtlCells} />
  </FluentProvider>
);
