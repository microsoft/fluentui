import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import type { StoryParameters } from 'storywright';
import { getStoryVariant, RTL, TestWrapperDecorator } from '../utilities';
import { Rating, RatingSize } from '@fluentui/react';

export default {
  title: 'Rating',

  decorators: [TestWrapperDecorator],
  parameters: {
    storyWright: {
      steps: new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .click('button.ms-Rating-button:nth-of-type(2)')
        .snapshot('click', { cropTo: '.testWrapper' })
        .end(),
    },
  } satisfies StoryParameters,
} satisfies Meta<typeof Rating>;

export const Root = () => <Rating min={1} max={5} />;
export const Rated = () => <Rating min={1} max={5} rating={2} />;

export const RatedRTL = getStoryVariant(Rated, RTL);

export const _Large = () => <Rating min={1} max={5} size={RatingSize.Large} />;
export const Disabled = () => <Rating min={1} max={5} disabled />;
