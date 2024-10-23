import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import { CircleRegular, CircleFilled, SquareRegular, SquareFilled } from '@fluentui/react-icons';
import { Rating } from '@fluentui/react-rating';

import { withStoryWrightSteps, TestWrapperDecoratorFixedWidth } from '../../utilities';

export default {
  title: 'Rating Converged',
  decorators: [
    TestWrapperDecoratorFixedWidth,
    story => withStoryWrightSteps({ story, steps: new Steps().snapshot('rest', { cropTo: '.testWrapper' }).end() }),
  ],
} satisfies Meta<typeof Rating>;

export const RatingSizeSmall = () => <Rating size="small" />;
RatingSizeSmall.storyName = 'Rating size small';

export const RatingSizeMedium = () => <Rating size="medium" />;
RatingSizeMedium.storyName = 'Rating size medium';

export const RatingSizeLarge = () => <Rating size="large" />;
RatingSizeLarge.storyName = 'Rating size large';

export const RatingSizeExtraLarge = () => <Rating size="extra-large" />;
RatingSizeExtraLarge.storyName = 'Rating size extra-large';

export const RatingWithCustomCircleIcons = () => (
  <Rating iconFilled={CircleFilled} iconOutline={CircleRegular} defaultValue={3.5} />
);
RatingWithCustomCircleIcons.storyName = 'Rating with custom circle icons';

export const RatingWithCustomSquareIcons = () => (
  <Rating iconFilled={SquareFilled} iconOutline={SquareRegular} defaultValue={3.5} />
);
RatingWithCustomSquareIcons.storyName = 'Rating with custom square icons';
