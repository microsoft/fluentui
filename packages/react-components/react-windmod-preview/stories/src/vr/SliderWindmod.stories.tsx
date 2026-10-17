import * as React from 'react';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import { Slider } from '@fluentui/react-windmod-preview/slider';

import { SliderVrScene } from './SliderVrScene';

export const SliderWindmod = (): React.ReactNode => (
  <FluentProvider>
    <SliderVrScene Slider={Slider} />
  </FluentProvider>
);
