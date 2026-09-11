import * as React from 'react';
import { FluentProvider, Rating, webLightTheme } from '@fluentui/react-components';
import { CircleFilled, CircleRegular } from '@fluentui/react-icons';

import { RatingVrScene } from './RatingVrScene';

export const RatingGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <RatingVrScene Rating={Rating} IconFilled={CircleFilled} IconOutline={CircleRegular} />
  </FluentProvider>
);
