import * as React from 'react';
import { RatingDisplay, ThemeProvider } from '@fluentui/react-windmod-preview';
import { CircleFilled } from '@fluentui/react-icons/headless/svg/circle';

import { RatingDisplayVrScene } from './RatingDisplayVrScene';

export const RatingDisplayWindmod = (): React.ReactNode => (
  <ThemeProvider>
    <RatingDisplayVrScene RatingDisplay={RatingDisplay} Icon={CircleFilled} />
  </ThemeProvider>
);
