import * as React from 'react';
import { FluentProvider, Slider, webLightTheme } from '@fluentui/react-components';

import { SliderVrScene } from './SliderVrScene';

export const SliderGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <SliderVrScene Slider={Slider} />
  </FluentProvider>
);
