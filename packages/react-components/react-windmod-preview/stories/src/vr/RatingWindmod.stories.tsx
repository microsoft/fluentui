import * as React from 'react';
import { FluentProvider, Rating } from '@fluentui/react-windmod-preview';
import { CircleFilled, CircleRegular } from '@fluentui/react-icons/headless/svg/circle';

import { RatingVrScene } from './RatingVrScene';

export const RatingWindmod = (): React.ReactNode => (
  <FluentProvider>
    <RatingVrScene Rating={Rating} IconFilled={CircleFilled} IconOutline={CircleRegular} />
  </FluentProvider>
);
