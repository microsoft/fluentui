import * as React from 'react';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';

import { rtlCells, TeachingPopoverCarouselVrScene } from './TeachingPopoverCarouselVrScene';
import { griffelParts } from './carouselSceneParts';

export const TeachingPopoverCarouselRtlGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme} dir="rtl">
    <TeachingPopoverCarouselVrScene {...griffelParts} cells={rtlCells} />
  </FluentProvider>
);
