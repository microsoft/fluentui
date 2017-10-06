/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { Rating, RatingSize } from 'office-ui-fabric-react';

storiesOf('Rating', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={ new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('div.ms-Rating-star:nth-of-type(2)')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .end()
      }
    >
      { story() }
    </Screener>
  )).add('Root', () => (
    <Rating
      min={ 1 }
      max={ 5 }
    />
  )).add('Rated', () => (
    <Rating
      min={ 1 }
      max={ 5 }
      rating={ 2 }
    />
  )).add('Large', () => (
    <Rating
      min={ 1 }
      max={ 5 }
      size={ RatingSize.Large }
    />
  )).add('Disabled', () => (
    <Rating
      min={ 1 }
      max={ 5 }
      disabled
    />
  ));