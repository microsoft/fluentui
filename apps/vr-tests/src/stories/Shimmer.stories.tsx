/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import {
  Shimmer,
  ShimmerElementType as ElemType,
  ShimmerElementVerticalAlign as ElemVerticalAlign,
  ShimmerElementsGroup
} from 'office-ui-fabric-react';

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
  )).add('Custom elements', () => (
    <Shimmer
      customElementsGroup={ (
        <div
          // tslint:disable-next-line:jsx-ban-props
          style={ { display: 'flex' } }
        >
          <ShimmerElementsGroup
            shimmerElements={ [
              { type: ElemType.circle, height: 40 },
              { type: ElemType.gap, widthInPixel: 16, height: 40 }
            ] }
          />
          <ShimmerElementsGroup
            flexWrap={ true }
            width={ '100%' }
            shimmerElements={ [
              { type: ElemType.line, widthInPercentage: 100, height: 10, verticalAlign: ElemVerticalAlign.bottom },
              { type: ElemType.line, widthInPercentage: 90, height: 8 },
              { type: ElemType.gap, widthInPercentage: 10, height: 20 }
            ] }
          />
        </div>
      ) }
      widthInPixel={ 300 }
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