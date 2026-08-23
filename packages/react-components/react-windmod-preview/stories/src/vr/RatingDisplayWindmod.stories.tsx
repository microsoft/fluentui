import * as React from 'react';
import { FluentProvider, RatingDisplay } from '@fluentui/react-windmod-preview';
import { CircleFilled } from '@fluentui/react-icons/headless/svg/circle';

import { RatingDisplayVrScene } from './RatingDisplayVrScene';

export const RatingDisplayWindmod = (): React.ReactNode => (
  <FluentProvider>
    <RatingDisplayVrScene RatingDisplay={RatingDisplay} Icon={CircleFilled} />
  </FluentProvider>
);
