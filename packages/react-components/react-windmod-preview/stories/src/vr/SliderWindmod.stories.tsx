import * as React from 'react';
import { Slider, ThemeProvider } from '@fluentui/react-windmod-preview';

import { SliderVrScene } from './SliderVrScene';

export const SliderWindmod = (): React.ReactNode => (
  <ThemeProvider>
    <SliderVrScene Slider={Slider} />
  </ThemeProvider>
);
