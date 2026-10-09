import * as React from 'react';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import { RatingDisplay } from '@fluentui/react-windmod-preview/rating-display';
import { CircleFilled } from '@fluentui/react-icons/headless/svg/circle';

import { RatingDisplayVrScene } from './RatingDisplayVrScene';

export const RatingDisplayWindmod = (): React.ReactNode => (
  <FluentProvider>
    <RatingDisplayVrScene RatingDisplay={RatingDisplay} Icon={CircleFilled} />
  </FluentProvider>
);
