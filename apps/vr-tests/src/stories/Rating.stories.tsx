/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { FabricDecorator, runStories } from '../utilities';
import { Rating, RatingSize } from 'office-ui-fabric-react';

const RatingDecorator = story => (
  <Screener
    steps={new Screener.Steps()
      .snapshot('default', { cropTo: '.testWrapper' })
      .click('button.ms-Rating-button:nth-of-type(2)')
      .snapshot('click', { cropTo: '.testWrapper' })
      .end()
    }
  >
    {story()}
  </Screener>
);

const ratingStories = {
  decorators: [FabricDecorator, RatingDecorator],
  stories: {
    'Root': () => <Rating min={1} max={5} />,
    'Rated': () => <Rating min={1} max={5} rating={2} />,
    'Allow Zero': () => <Rating max={5} rating={0} allowZeroStars />,
    'Large': () => <Rating min={1} max={5} size={RatingSize.Large} />,
    'Disabled': () => <Rating min={1} max={5} disabled />
  }
};

runStories('Rating', ratingStories);