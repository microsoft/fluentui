/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { Shimmer, ShimmerElementType as ElemType } from 'office-ui-fabric-react';

storiesOf('Shimmer', module)
  .addDecorator(story => (
    // Shimmer without a specified width needs a container with a fixed width or it's collapsing.
    <div style={ { width: '500px' } }>
      { story() }
    </div>
  ))
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={ new Screener.Steps()
        .snapshot('default')
        .end()
      }
    >
      { story() }
    </Screener>
  )).add('Basic', () => (
    <Shimmer />
  )).add('50% width', () => (
    <Shimmer
      widthInPercentage={ 50 }
    />
  )).add('Circle Gap Line', () => (
    <Shimmer
      shimmerElements={ [
        { type: ElemType.circle },
        { type: ElemType.gap, widthInPercentage: 2 },
        { type: ElemType.line },
      ] }
    />
  )).add('Data not loaded', () => (
    <Shimmer
      isDataLoaded={ false }
      ariaLabel={ 'Loading content' }
    >
      <div>Example content</div>
    </Shimmer>
  )).add('Data loaded', () => (
    <Shimmer
      isDataLoaded={ true }
      ariaLabel={ 'Loading content' }
    >
      <div>Example content</div>
    </Shimmer>
  ));