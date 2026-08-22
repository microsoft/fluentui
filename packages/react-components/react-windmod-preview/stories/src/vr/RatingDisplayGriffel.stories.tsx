import * as React from 'react';
import { FluentProvider, RatingDisplay, webLightTheme } from '@fluentui/react-components';
import { CircleFilled } from '@fluentui/react-icons';

import { RatingDisplayVrScene } from './RatingDisplayVrScene';

export const RatingDisplayGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <RatingDisplayVrScene RatingDisplay={RatingDisplay} Icon={CircleFilled} />
  </FluentProvider>
);
