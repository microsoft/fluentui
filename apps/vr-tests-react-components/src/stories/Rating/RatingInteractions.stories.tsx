import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import { Rating } from '@fluentui/react-rating';

import {
  getStoryVariant,
  withStoryWrightSteps,
  TestWrapperDecoratorFixedWidth,
  HIGH_CONTRAST,
  DARK_MODE,
} from '../../utilities';

export default {
  title: 'Rating Converged',
  decorators: [
    TestWrapperDecoratorFixedWidth,
    story =>
      withStoryWrightSteps({
        story,
        steps: new Steps()
          .snapshot('rest', { cropTo: '.testWrapper' })
          .hover('input')
          .snapshot('hover', { cropTo: '.testWrapper' })
          .end(),
      }),
  ],
} satisfies Meta<typeof Rating>;

export const NeutralRatingWithHalfStar = () => <Rating defaultValue={3.5} />;
NeutralRatingWithHalfStar.storyName = 'Neutral Rating with half star';

export const NeutralRatingWithHalfStartHighContrast = getStoryVariant(NeutralRatingWithHalfStar, HIGH_CONTRAST);

export const NeutralRatingWithHalfStartDarkMode = getStoryVariant(NeutralRatingWithHalfStar, DARK_MODE);

export const BrandRatingWithHalfStar = () => <Rating color="brand" defaultValue={3.5} />;
BrandRatingWithHalfStar.storyName = 'Brand Rating with half star';

export const BrandRatingWithHalfStarHighContrast = getStoryVariant(BrandRatingWithHalfStar, HIGH_CONTRAST);

export const BrandRatingWithHalfStarDarkMode = getStoryVariant(BrandRatingWithHalfStar, DARK_MODE);

export const MarigoldRatingWithHalfStar = () => <Rating color="marigold" defaultValue={3.5} />;
MarigoldRatingWithHalfStar.storyName = 'Marigold Rating with half star';

export const MarigoldRatingWithHalfStarHighContrast = getStoryVariant(MarigoldRatingWithHalfStar, HIGH_CONTRAST);

export const MarigoldRatingWithHalfStarDarkMode = getStoryVariant(MarigoldRatingWithHalfStar, DARK_MODE);
