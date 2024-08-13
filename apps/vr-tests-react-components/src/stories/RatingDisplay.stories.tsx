import * as React from 'react';
import type { Meta } from '@storybook/react';
import { CircleFilled, SquareFilled } from '@fluentui/react-icons';
import { RatingDisplay } from '@fluentui/react-rating';
import {
  getStoryVariant,
  withStoryWrightSteps,
  TestWrapperDecoratorFixedWidth,
  HIGH_CONTRAST,
  DARK_MODE,
} from '../utilities';
import { Steps } from 'storywright';

export default {
  title: 'RatingDisplay Converged',
  decorators: [
    TestWrapperDecoratorFixedWidth,
    story => withStoryWrightSteps({ story, steps: new Steps().snapshot('rest', { cropTo: '.testWrapper' }).end() }),
  ],
} satisfies Meta<typeof RatingDisplay>;

export const NoValue = () => <RatingDisplay />;
NoValue.storyName = 'no value';

export const SizeSmallWithValueAndCount = () => <RatingDisplay size="small" value={5} count={1160} />;
SizeSmallWithValueAndCount.storyName = 'size small with value and count';

export const SizeMediumWithValueAndCount = () => <RatingDisplay size="medium" value={5} count={1160} />;
SizeMediumWithValueAndCount.storyName = 'size medium with value and count';

export const SizeLargeWithValueAndCount = () => <RatingDisplay size="large" value={5} count={1160} />;
SizeLargeWithValueAndCount.storyName = 'size large with value and count';

export const SizeExtraLargeWithValueAndCount = () => <RatingDisplay size="extra-large" value={5} count={1160} />;
SizeExtraLargeWithValueAndCount.storyName = 'size extra-large with value and count';

export const CustomCircleIcons = () => <RatingDisplay icon={CircleFilled} value={3} />;
CustomCircleIcons.storyName = 'custom circle icons';

export const CustomSquareIcons = () => <RatingDisplay icon={SquareFilled} value={3} />;
CustomSquareIcons.storyName = 'custom square icons';

export const RoundedUp = () => <RatingDisplay value={3.8} />;
RoundedUp.storyName = 'rounded up';

export const RoundedDown = () => <RatingDisplay value={3.7} />;
RoundedDown.storyName = 'rounded down';

export const NeutralWithHalfValue = () => <RatingDisplay value={2.5} />;
NeutralWithHalfValue.storyName = 'Neutral with half value';

export const NeutralWithHalfValueHighContrast = getStoryVariant(NeutralWithHalfValue, HIGH_CONTRAST);

export const NeutralWithHalfValueDarkMode = getStoryVariant(NeutralWithHalfValue, DARK_MODE);

export const BrandWithHalfValue = () => <RatingDisplay value={2.5} color="brand" />;
BrandWithHalfValue.storyName = 'Brand with half value';

export const BrandWithHalfValueHighContrast = getStoryVariant(BrandWithHalfValue, HIGH_CONTRAST);

export const BrandWithHalfValueDarkMode = getStoryVariant(BrandWithHalfValue, DARK_MODE);

export const MarigoldWithHalfValue = () => <RatingDisplay value={2.5} color="marigold" />;
MarigoldWithHalfValue.storyName = 'Marigold with half value';

export const MarigoldWithHalfValueHighContrast = getStoryVariant(MarigoldWithHalfValue, HIGH_CONTRAST);

export const MarigoldWithHalfValueDarkMode = getStoryVariant(MarigoldWithHalfValue, DARK_MODE);

export const Compact = () => <RatingDisplay compact value={3} />;
