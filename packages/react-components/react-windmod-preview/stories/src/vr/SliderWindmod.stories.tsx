import * as React from 'react';
import { FluentProvider, Slider } from '@fluentui/react-windmod-preview';

import { SliderVrScene } from './SliderVrScene';

export const SliderWindmod = (): React.ReactNode => (
  <FluentProvider>
    <SliderVrScene Slider={Slider} />
  </FluentProvider>
);
